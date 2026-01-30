# Docker Setup for Personal Expense Tracker

This directory contains the Docker configuration for running the Personal Expense Tracker application.

## Architecture

The application consists of two main services:
- **Backend**: FastAPI application running on Python 3.11
- **Frontend**: React application served by Nginx

## Prerequisites

- Docker and Docker Compose installed
- OpenAI API key (for AI features)

## Quick Start

1. Clone the repository and navigate to the project root
2. Copy the environment file and configure it:
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```
3. Build and start the containers:
   ```bash
   cd deploy
   docker compose up --build
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Environment Variables

### Backend (.env)
- `DATABASE_URL`: SQLite database path
- `SECRET_KEY`: JWT secret key (change in production)
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `BACKEND_CORS_ORIGINS`: Allowed CORS origins
- `PROJECT_NAME`: Application name
- `API_V1_STR`: API version prefix
- `ENVIRONMENT`: Environment (development/production)
- `DEBUG`: Debug mode

## Services

### Backend Service
- **Container Name**: expense-tracker-backend
- **Port**: 8000
- **Health Check**: HTTP endpoint `/health`
- **Volumes**: 
  - SQLite database persistence
  - Data directory for additional storage

### Frontend Service
- **Container Name**: expense-tracker-frontend
- **Port**: 3000
- **Health Check**: HTTP endpoint `/`
- **Proxy**: API requests proxied to backend

## Development

### Running in Development Mode
```bash
# Start only the backend
docker compose up backend

# Start only the frontend
docker compose up frontend

# View logs
docker compose logs -f [service-name]

# Stop containers
docker compose down
```

### Rebuilding Services
```bash
# Rebuild specific service
docker compose up --build backend

# Rebuild all services
docker compose up --build
```

## Production Deployment

For production deployment:

1. Update the `.env` file with production values:
   - Change `SECRET_KEY` to a secure random value
   - Set `ENVIRONMENT=production`
   - Set `DEBUG=false`

2. Consider using a production-grade database instead of SQLite

3. Add SSL/TLS termination

4. Set up proper logging and monitoring

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 8000 are available
2. **Permission issues**: Check file permissions for mounted volumes
3. **Build failures**: Verify Dockerfile paths and dependencies

### Health Checks

Both services include health checks:
- Backend: Checks `/health` endpoint
- Frontend: Checks root endpoint

Health status can be viewed with:
```bash
docker compose ps
```

### Logs

View service logs:
```bash
# All services
docker compose logs

# Specific service
docker compose logs backend
docker compose logs frontend

# Follow logs
docker compose logs -f
```

## File Structure

```
deploy/
├── docker-compose.yml      # Main Docker Compose configuration
├── Dockerfile.backend      # Backend service Dockerfile
├── Dockerfile.frontend     # Frontend service Dockerfile
├── nginx.conf             # Nginx configuration
├── .env.example           # Environment variables template
├── .dockerignore.backend  # Docker ignore for backend
├── .dockerignore.frontend # Docker ignore for frontend
└── README.md              # This file
```

## Security Considerations

1. Change default secrets before production deployment
2. Use environment-specific configurations
3. Regularly update base images
4. Implement proper network segmentation
5. Add rate limiting and authentication

## Performance Optimization

1. Use multi-stage builds to reduce image size
2. Implement proper caching strategies
3. Consider using a CDN for static assets
4. Optimize database queries
5. Implement proper indexing

## Monitoring

Consider adding:
- Application performance monitoring
- Log aggregation
- Metrics collection
- Alerting systems