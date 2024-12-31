# Web3 Project Documentation

## Project Overview
A full-stack web3 application integrating blockchain functionality with traditional web services, featuring user authentication, order management, and administrative capabilities.

## Repository Structure
```
Webproject/
├── frontend/    # React TypeScript frontend
├── backend/     # Node.js Express backend
└── README.md    # Main documentation
```

## Technology Stack

### Frontend
- React (TypeScript)
- Tailwind CSS
- Ethers.js
- Vite
- React Router
- Framer Motion

### Backend
- Node.js & Express
- MongoDB
- Redis
- JWT
- Bcrypt
- Nodemailer

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- Redis
- Git

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Environment Configuration
Create `.env` files in both frontend and backend directories:

```env
# Backend .env
PORT=5000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret

# Frontend .env
VITE_API_URL=http://localhost:5000
VITE_WEB3_NETWORK=mainnet
```

## API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signup` | User registration |
| POST | `/api/login` | Authentication |
| POST | `/api/verify-otp` | OTP verification |
| POST | `/api/forgot-password` | Password reset |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | List orders |
| GET | `/api/orders/:id` | Order details |
| PATCH | `/api/orders/:id` | Update order |
| DELETE | `/api/orders/:id` | Delete order |

## Core Features
- Web3 wallet integration
- User authentication
- Order management
- Admin dashboard
- Real-time updates
- Email notifications
- Data caching

## Security
- JWT authentication
- Password hashing
- Rate limiting
- CORS protection
- Input validation
- Protected routes
- OTP verification

## Development Workflow
1. Fork repository
2. Create feature branch: `git checkout -b feature/NewFeature`
3. Commit changes: `git commit -m 'Add NewFeature'`
4. Push branch: `git push origin feature/NewFeature`
5. Submit Pull Request

## License
MIT License

## Support
For issues or queries:
1. Open GitHub issue
2. Contact: junaidrao@gmail.com