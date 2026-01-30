.PHONY: help build up down logs clean restart shell-backend shell-frontend

# Default target
help:
	@echo "Available commands:"
	@echo "  build          - Build all Docker images"
	@echo "  up             - Start all services"
	@echo "  down           - Stop all services"
	@echo "  logs           - Show logs for all services"
	@echo "  logs-backend   - Show logs for backend service"
	@echo "  logs-frontend  - Show logs for frontend service"
	@echo "  clean          - Remove containers, images, and volumes"
	@echo "  restart        - Restart all services"
	@echo "  shell-backend  - Open shell in backend container"
	@echo "  shell-frontend - Open shell in frontend container"
	@echo "  test           - Run tests in containers"
	@echo "  dev            - Start in development mode"

# Build all Docker images
build:
	@echo "Building Docker images..."
	cd deploy && docker compose build

# Start all services
up:
	@echo "Starting all services..."
	cd deploy && docker compose up -d

# Stop all services
down:
	@echo "Stopping all services..."
	cd deploy && docker compose down

# Show logs for all services
logs:
	@echo "Showing logs for all services..."
	cd deploy && docker compose logs -f

# Show logs for backend service
logs-backend:
	@echo "Showing logs for backend service..."
	cd deploy && docker compose logs -f backend

# Show logs for frontend service
logs-frontend:
	@echo "Showing logs for frontend service..."
	cd deploy && docker compose logs -f frontend

# Clean up containers, images, and volumes
clean:
	@echo "Cleaning up Docker resources..."
	cd deploy && docker compose down -v --rmi all

# Restart all services
restart: down up

# Open shell in backend container
shell-backend:
	@echo "Opening shell in backend container..."
	cd deploy && docker compose exec backend /bin/bash

# Open shell in frontend container
shell-frontend:
	@echo "Opening shell in frontend container..."
	cd deploy && docker compose exec frontend /bin/sh

# Run tests in containers
test:
	@echo "Running tests..."
	cd deploy && docker compose exec backend python -m pytest || true
	cd deploy && docker compose exec frontend npm test || true

# Start in development mode
dev:
	@echo "Starting in development mode..."
	cd deploy && docker compose up --build

# Check service status
status:
	@echo "Checking service status..."
	cd deploy && docker compose ps

# View resource usage
stats:
	@echo "Showing resource usage..."
	cd deploy && docker compose exec backend top || true
	cd deploy && docker compose exec frontend top || true