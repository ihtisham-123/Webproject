// middleware/errorHandler.js
const handleMongooseError = (err, res) => {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => ({
        field: error.path,
        message: error.message
      }));
      return res.status(400).json({ 
        status: 'error',
        type: 'ValidationError',
        errors 
      });
    }
  
    if (err.code === 11000) {  // Duplicate key error
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        status: 'error',
        type: 'DuplicateError',
        message: `${field} already exists`
      });
    }
  
    if (err.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        type: 'CastError',
        message: 'Invalid ID format'
      });
    }
  
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  };
  
  const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    handleMongooseError(err, res);
  };
  
module.exports = errorHandler;