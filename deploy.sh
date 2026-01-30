#!/bin/bash

# Personal Expense Tracker Deployment Script
# This script helps deploy the application using Docker Compose

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_status "Docker and Docker Compose are installed."
}

# Check environment files
check_env_files() {
    if [ ! -f "backend/.env" ]; then
        print_warning "backend/.env file not found. Creating from template..."
        cp backend/.env.example backend/.env
        print_warning "Please edit backend/.env with your configuration before continuing."
        read -p "Press Enter to continue after editing the file..."
    fi
    
    if [ ! -f "deploy/.env" ]; then
        print_warning "deploy/.env file not found. Creating from template..."
        cp deploy/.env.example deploy/.env
        print_warning "Please edit deploy/.env with your configuration before continuing."
        read -p "Press Enter to continue after editing the file..."
    fi
}

# Function to deploy in development mode
deploy_dev() {
    print_status "Deploying in development mode..."
    cd deploy
    docker compose down
    docker compose up --build -d
    print_status "Development deployment complete!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend: http://localhost:8000"
    print_status "API Docs: http://localhost:8000/docs"
}

# Function to deploy in production mode
deploy_prod() {
    print_status "Deploying in production mode..."
    
    # Check for SSL certificates
    if [ ! -d "deploy/ssl" ]; then
        print_warning "SSL directory not found. Creating self-signed certificates for testing..."
        mkdir -p deploy/ssl
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout deploy/ssl/key.pem \
            -out deploy/ssl/cert.pem \
            -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
        print_warning "Self-signed certificates created. Replace with proper certificates for production."
    fi
    
    cd deploy
    docker compose -f docker-compose.yml -f docker-compose.prod.yml down
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
    print_status "Production deployment complete!"
    print_status "Application: https://localhost"
    print_status "Note: Using self-signed certificates. Browser will show security warning."
}

# Function to stop services
stop_services() {
    print_status "Stopping all services..."
    cd deploy
    docker compose down
    if [ -f "docker-compose.prod.yml" ]; then
        docker compose -f docker-compose.yml -f docker-compose.prod.yml down
    fi
    print_status "All services stopped."
}

# Function to clean up
cleanup() {
    print_status "Cleaning up Docker resources..."
    cd deploy
    docker compose down -v --rmi all
    if [ -f "docker-compose.prod.yml" ]; then
        docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v --rmi all
    fi
    docker system prune -f
    print_status "Cleanup complete."
}

# Function to show logs
show_logs() {
    cd deploy
    if [ "$1" = "backend" ]; then
        docker compose logs -f backend
    elif [ "$1" = "frontend" ]; then
        docker compose logs -f frontend
    elif [ "$1" = "nginx" ] && [ -f "docker-compose.prod.yml" ]; then
        docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f nginx
    else
        docker compose logs -f
    fi
}

# Function to show status
show_status() {
    cd deploy
    docker compose ps
    if [ -f "docker compose.prod.yml" ]; then
        echo -e "\n${YELLOW}Production services:${NC}"
        docker compose -f docker-compose.yml -f docker-compose.prod.yml ps
    fi
}

# Main script logic
case "$1" in
    "dev")
        check_docker
        check_env_files
        deploy_dev
        ;;
    "prod")
        check_docker
        check_env_files
        deploy_prod
        ;;
    "stop")
        stop_services
        ;;
    "clean")
        cleanup
        ;;
    "logs")
        show_logs "$2"
        ;;
    "status")
        show_status
        ;;
    "help"|*)
        echo "Personal Expense Tracker Deployment Script"
        echo ""
        echo "Usage: $0 {dev|prod|stop|clean|logs|status|help}"
        echo ""
        echo "Commands:"
        echo "  dev     - Deploy in development mode"
        echo "  prod    - Deploy in production mode with SSL"
        echo "  stop    - Stop all services"
        echo "  clean   - Remove all containers, images, and volumes"
        echo "  logs    - Show logs (optional: backend, frontend, nginx)"
        echo "  status  - Show status of all services"
        echo "  help    - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 dev           # Deploy in development mode"
        echo "  $0 prod          # Deploy in production mode"
        echo "  $0 logs backend  # Show backend logs"
        echo "  $0 status        # Show service status"
        ;;
esac