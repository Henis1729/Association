# Complete setup and run script for Association Platform
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Association Platform Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create Backend .env
Write-Host "Step 1: Creating Backend environment file..." -ForegroundColor Yellow
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

# Step 2: Create Frontend .env
Write-Host "Step 2: Creating Frontend environment file..." -ForegroundColor Yellow
"REACT_APP_API_URL=http://localhost:3001/api/v1" | Out-File -FilePath "Fronend\.env" -Encoding utf8 -NoNewline
Write-Host "✓ Frontend .env created" -ForegroundColor Green

# Step 3: Check dependencies
Write-Host ""
Write-Host "Step 3: Checking dependencies..." -ForegroundColor Yellow

if (!(Test-Path "Backend\node_modules")) {
    Write-Host "Installing Backend dependencies..." -ForegroundColor Yellow
    Set-Location Backend
    npm install
    Set-Location ..
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Backend dependencies already installed" -ForegroundColor Green
}

if (!(Test-Path "Fronend\node_modules")) {
    Write-Host "Installing Frontend dependencies..." -ForegroundColor Yellow
    Set-Location Fronend
    npm install
    Set-Location ..
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Make sure MongoDB is running!" -ForegroundColor Red
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host "  1. Open a new terminal and run: cd Backend && npm run dev" -ForegroundColor White
Write-Host "  2. Open another terminal and run: cd Fronend && npm start" -ForegroundColor White
Write-Host ""
Write-Host "URLs:" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:3001/api/v1" -ForegroundColor White
Write-Host ""

