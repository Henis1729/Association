# Simple status check script
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Association Platform Status" -ForegroundColor Cyan
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
Write-Host "and run this script again: .\check-status.ps1" -ForegroundColor Yellow
Write-Host ""

