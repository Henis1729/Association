# PowerShell script to create Frontend .env file
$envContent = "REACT_APP_API_URL=http://localhost:3001/api/v1"

$envContent | Out-File -FilePath "Fronend\.env" -Encoding utf8 -NoNewline
Write-Host "Frontend .env file created successfully!" -ForegroundColor Green

