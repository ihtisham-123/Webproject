# Web3 Backend Service

A robust Node.js backend service for handling user authentication, order management, and admin functionalities with MongoDB and Redis integration.

## System Architecture
```
Client Apps (React) → Express API Server → MongoDB
         ↑              ↓      ↑            ↑
         └────── Authentication ───── Redis Cache
                     Middleware      (OTP/Sessions)
```

## Project Structure
```
backend/
├── controllers/
│   ├── userController.js
│   ├── orderController.js
│   └── adminController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── adminAuth.js
│   └── validation.js
├── models/
│   ├── User.js
│   ├── Admin.js
│   └── Order.js
├── routes/
│   ├── userRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
├── utils/
├── .env
└── server.js
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Redis

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/web3-backend.git
cd web3-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Documentation

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signup` | Register new user |
| POST | `/api/login` | User authentication |
| POST | `/api/verify-otp` | Email verification |
| POST | `/api/forgot-password` | Reset password request |
| PATCH | `/api/reset-password/:token` | Password reset |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | List all orders |
| GET | `/api/orders/:id` | Get order details |
| GET | `/api/orders/user/:userId` | Get user orders |
| PATCH | `/api/orders/:id` | Update order |
| DELETE | `/api/orders/:id` | Delete order |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin authentication |
| GET | `/api/admin/search` | Search functionality |

## Security Features

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- Input validation
- Protected routes
- OTP verification

## Error Handling

The application implements a global error handler for:
- Authentication failures
- Validation errors
- Database operations
- Business logic exceptions

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details