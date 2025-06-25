# Fan Meet & Greet Manager

A comprehensive web application for managing artist-fan meet and greet events, including registration, queue management, and interaction tracking.

## Overview

The Fan Meet & Greet Manager is designed to help artists, managers, and venue operators organize and manage fan meet and greet events. The application streamlines the process of scheduling, registering attendees, managing queues, and tracking interactions to create memorable experiences for fans while reducing administrative overhead for artists and their teams.

## Key Features

- **Event Creation and Management**: Create and manage meet & greet events with customizable packages
- **Attendee Registration**: Handle fan registrations with approval workflows and QR code generation
- **Queue Management**: Real-time queue management with position tracking and notifications
- **Interaction Tracking**: Record notes about fan interactions and track interaction times
- **Merchandise and Photo Management**: Track merchandise distribution and manage photo delivery
- **Reporting and Analytics**: Generate insights on attendance, satisfaction, and identify super fans
- **Communication Tools**: Send instructions, queue notifications, and thank you messages

## Technology Stack

### Frontend
- React.js with TypeScript
- Material-UI for consistent, responsive design
- Redux for state management
- Axios for API requests
- Firebase Authentication

### Backend
- Node.js with Express
- RESTful API with OpenAPI specification
- JWT-based authentication with role-based access control

### Database
- PostgreSQL for relational data storage
- Redis for caching

### Storage
- AWS S3 for photo storage and delivery
- Cloudfront for CDN

### Deployment
- Docker and Kubernetes
- CI/CD with GitHub Actions
- AWS ECS or Google Cloud Run

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL (v13+)
- Redis (v6+)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dxaginfo/fan-meet-greet-platform-2025.git
   cd fan-meet-greet-platform-2025
   ```

2. Install dependencies:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   ```
   # In the backend directory
   cp .env.example .env
   # Edit .env with your configuration values
   ```

4. Start the development environment:
   ```
   # In the root directory
   docker-compose up -d
   ```

5. Run migrations:
   ```
   cd backend
   npm run db:migrate
   ```

6. Start the development servers:
   ```
   # In the backend directory
   npm run dev

   # In the frontend directory
   npm start
   ```

## Project Structure

```
fan-meet-greet-platform-2025/
├── backend/                 # Node.js/Express backend
│   ├── src/                 # Source code
│   │   ├── api/             # API routes
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── db/              # Database models and migrations
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── .env.example         # Example environment variables
│   └── package.json         # Backend dependencies
├── frontend/                # React.js frontend
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux state management
│   │   ├── services/        # API services
│   │   ├── styles/          # CSS/SCSS styles
│   │   └── utils/           # Utility functions
│   └── package.json         # Frontend dependencies
├── docker-compose.yml       # Docker Compose configuration
└── README.md                # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or suggestions, please open an issue on GitHub.