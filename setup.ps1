# ============================================
# Association Platform - Setup & Management Script
# ============================================
# This script handles:
# - Environment file creation
# - Dependency installation
# - Server status checking
# - Server startup
# ============================================

param(
    [switch]$Setup,
    [switch]$Status,
    [switch]$StartBackend,
    [switch]$StartFrontend,
    [switch]$Help
)

# Function: Show menu
function Show-Menu {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "   Association Platform Manager" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "What would you like to do?" -ForegroundColor Yellow
    Write-Host "  1. Setup (Create .env files & Install dependencies)" -ForegroundColor White
    Write-Host "  2. Check Status (Check if servers are running)" -ForegroundColor White
    Write-Host "  3. Start Backend Server" -ForegroundColor White
    Write-Host "  4. Start Frontend Server" -ForegroundColor White
    Write-Host "  5. Exit" -ForegroundColor White
    Write-Host ""
    $choice = Read-Host "Enter your choice (1-5)"
    return $choice
}

# Function: Create Backend .env file
function Create-BackendEnv {
    Write-Host ""
    Write-Host "Creating Backend environment file..." -ForegroundColor Yellow
    
    $backendEnv = @"
PROJECT_NAME=association
NODE_ENV=development
LOG_REQUEST_DATA=true
PORT=3001
JSON_BODY_LIMIT=10mb

MONGODB_URI=mongodb://localhost:27017/association
BASE_URL=/api/v1

JWT_SECRET=dev-secret-key-change-in-production-min-32-chars
JWT_EXPIRES_IN=7d

EMAIL_USER=test@test.com
EMAIL_PASSWORD=test
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

ACCESSKEYID=
SECRET_KEY=
REGION=
BUCKET=
"@
    
    $backendEnv | Out-File -FilePath "Backend\.env" -Encoding utf8 -NoNewline
    Write-Host "✓ Backend .env created" -ForegroundColor Green
}

# Function: Create Frontend .env file
function Create-FrontendEnv {
    Write-Host "Creating Frontend environment file..." -ForegroundColor Yellow
    "REACT_APP_API_URL=http://localhost:3001/api/v1" | Out-File -FilePath "Fronend\.env" -Encoding utf8 -NoNewline
    Write-Host "✓ Frontend .env created" -ForegroundColor Green
}

# Function: Install dependencies
function Install-Dependencies {
    Write-Host ""
    Write-Host "Checking dependencies..." -ForegroundColor Yellow
    
    # Backend dependencies
    if (!(Test-Path "Backend\node_modules")) {
        Write-Host "Installing Backend dependencies..." -ForegroundColor Yellow
        Push-Location Backend
        npm install
        Pop-Location
        Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✓ Backend dependencies already installed" -ForegroundColor Green
    }
    
    # Frontend dependencies
    if (!(Test-Path "Fronend\node_modules")) {
        Write-Host "Installing Frontend dependencies..." -ForegroundColor Yellow
        Push-Location Fronend
        npm install
        Pop-Location
        Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
    }
}

# Function: Check server status
function Check-Status {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "   Server Status Check" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Check Backend
    Write-Host "Checking Backend API..." -ForegroundColor Yellow
    try {
        $backend = Invoke-WebRequest -Uri "http://localhost:3001/api/v1/" -TimeoutSec 3 -ErrorAction Stop
        Write-Host "✓ Backend: ONLINE" -ForegroundColor Green
        Write-Host "  URL: http://localhost:3001/api/v1/" -ForegroundColor White
    } catch {
        Write-Host "✗ Backend: OFFLINE or Starting..." -ForegroundColor Red
        Write-Host "  Check the Backend terminal window for errors" -ForegroundColor Yellow
    }
    
    Write-Host ""
    
    # Check Frontend
    Write-Host "Checking Frontend..." -ForegroundColor Yellow
    try {
        $frontend = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 3 -ErrorAction Stop
        Write-Host "✓ Frontend: ONLINE" -ForegroundColor Green
        Write-Host "  URL: http://localhost:3000" -ForegroundColor White
    } catch {
        Write-Host "✗ Frontend: OFFLINE or Starting..." -ForegroundColor Red
        Write-Host "  Check the Frontend terminal window for errors" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Note: If servers are starting, wait 30-60 seconds" -ForegroundColor Yellow
    Write-Host "and check status again" -ForegroundColor Yellow
    Write-Host ""
}

# Function: Setup everything
function Start-Setup {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "   Setup - Association Platform" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Create environment files
    Create-BackendEnv
    Create-FrontendEnv
    
    # Install dependencies
    Install-Dependencies
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "   Setup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "IMPORTANT: Make sure MongoDB is running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Ensure MongoDB is running" -ForegroundColor White
    Write-Host "  2. Run this script again and choose 'Start Backend Server'" -ForegroundColor White
    Write-Host "  3. Run this script again and choose 'Start Frontend Server'" -ForegroundColor White
    Write-Host ""
    Write-Host "URLs:" -ForegroundColor Yellow
    Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
    Write-Host "  Backend:  http://localhost:3001/api/v1" -ForegroundColor White
    Write-Host ""
}

# Function: Start Backend server
function Start-BackendServer {
    Write-Host ""
    Write-Host "Starting Backend server..." -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    if (!(Test-Path "Backend\.env")) {
        Write-Host "⚠ Backend .env file not found!" -ForegroundColor Red
        Write-Host "Run setup first (option 1)" -ForegroundColor Yellow
        return
    }
    
    Push-Location Backend
    npm run dev
    Pop-Location
}

# Function: Start Frontend server
function Start-FrontendServer {
    Write-Host ""
    Write-Host "Starting Frontend server..." -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    if (!(Test-Path "Fronend\.env")) {
        Write-Host "⚠ Frontend .env file not found!" -ForegroundColor Red
        Write-Host "Run setup first (option 1)" -ForegroundColor Yellow
        return
    }
    
    Push-Location Fronend
    npm start
    Pop-Location
}

# Function: Show help
function Show-Help {
    Write-Host ""
    Write-Host "Association Platform - Setup & Management Script" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\setup.ps1                 # Interactive menu" -ForegroundColor White
    Write-Host "  .\setup.ps1 -Setup          # Run full setup" -ForegroundColor White
    Write-Host "  .\setup.ps1 -Status         # Check server status" -ForegroundColor White
    Write-Host "  .\setup.ps1 -StartBackend   # Start backend server" -ForegroundColor White
    Write-Host "  .\setup.ps1 -StartFrontend  # Start frontend server" -ForegroundColor White
    Write-Host "  .\setup.ps1 -Help           # Show this help" -ForegroundColor White
    Write-Host ""
}

# ============================================
# Main Script Logic
# ============================================

# If help flag is set, show help and exit
if ($Help) {
    Show-Help
    exit
}

# If command-line flags are used, execute directly
if ($Setup) {
    Start-Setup
    exit
}

if ($Status) {
    Check-Status
    exit
}

if ($StartBackend) {
    Start-BackendServer
    exit
}

if ($StartFrontend) {
    Start-FrontendServer
    exit
}

# Otherwise, show interactive menu
while ($true) {
    $choice = Show-Menu
    
    switch ($choice) {
        "1" {
            Start-Setup
            Write-Host ""
            Read-Host "Press Enter to continue"
        }
        "2" {
            Check-Status
            Write-Host ""
            Read-Host "Press Enter to continue"
        }
        "3" {
            Start-BackendServer
        }
        "4" {
            Start-FrontendServer
        }
        "5" {
            Write-Host ""
            Write-Host "Goodbye! 👋" -ForegroundColor Cyan
            Write-Host ""
            exit
        }
        default {
            Write-Host ""
            Write-Host "Invalid choice. Please try again." -ForegroundColor Red
            Write-Host ""
            Start-Sleep -Seconds 1
        }
    }
}

