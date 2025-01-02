const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { sendVerificationCode } = require('../utils/emailService');

require('dotenv').config();


const generateVerificationCode = async () => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const hashedCode = await bcrypt.hash(verificationCode, 10);
  return { verificationCode, hashedCode };
};


const Redis = require('ioredis');

// Initialize Redis client
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    // Enable reconnection attempts
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

// Handle Redis connection events
redis.on('connect', () => console.log('Successfully connected to Redis'));
 redis.on('error', (err) => console.error('Redis Client Error', err));

exports.signup = async (req, res) => {
    try {
        const {
            name, username, email, password,
            country, phoneNumber, address,
            state, city, zipCode
        } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email or username already exists'
            });
        }

        // Create user
        const user = await User.create({
            name, username, email, password,
            country, phoneNumber, address,
            state, city, zipCode
        });

        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        try {
            // Store OTP in Redis with 10 minutes expiration
            const redisKey = `otp:${email}`;
            await redis.setex(redisKey, 600, verificationCode);
        } catch (redisError) {
            // If Redis fails, delete the created user and throw error
            await User.findByIdAndDelete(user._id);
            throw new Error('Failed to generate verification code. Please try again.',redisError);
        }

        // Send verification email
        try {
            await sendVerificationCode(email, name, verificationCode);
        } catch (emailError) {
          
            // If email fails, clean up Redis and user
            await redis.del(`otp:${email}`);
            await User.findByIdAndDelete(user._id);
            throw new Error('Failed to send verification email. Please try again.');
        }

        res.status(201).json({
            status: 'success',
            message: 'Verification code sent to email'
            
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Utility function to verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
console.log('Email:', email);
console.log('OTP:', otp);
        const storedOTP = await redis.get(`otp:${email}`);
        
        if (!storedOTP) {
            return res.status(400).json({
                status: 'error',
                message: 'Verification code expired or invalid'
            });
        }

        if (storedOTP !== otp) {
          console.log('Stored OTP:', storedOTP);
console.log('OTP from request:', otp);
            return res.status(400).json({
                status: 'error',
                message: 'Invalid verification code qqq'
            });
        }

        // Delete the OTP after successful verification
        await redis.del(`otp:${email}`);

        // Update user verification status
        await User.findOneAndUpdate(
            { email },
            { isVerified: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Email verified successfully'
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};






exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and verification code are required',
      });
    }

    // Retrieve OTP from Redis
    const redisKey = `otp:${email}`;
    const storedOtp = await client.get(redisKey);

    if (!storedOtp) {
      return res.status(400).json({
        status: 'error',
        message: 'OTP expired or invalid',
      });
    }

    // Compare OTP
    if (storedOtp !== code) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid verification code',
      });
    }

    // Mark user as verified
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    user.isVerified = true;
    await user.save();

    // Remove OTP from Redis after successful verification
    await client.del(redisKey);

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Email verification failed',
    });
  }
};


// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

const generateToken = (id, username, email) => {
  return jwt.sign({ id, username, email }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id, user.username, user.email),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};



exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save();

    const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      html: `Click here to reset your password: ${resetURL}`
    });

    res.status(200).json({
      status: 'success',
      message: 'Reset token sent to email'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
exports.resetPassword = async (req, res) => {
    try {
        // Get user based on token
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        // Check if token hasn't expired and user exists
        if (!user) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        // Set new password
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // Generate new token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(200).json({
            status: 'success',
            token
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};