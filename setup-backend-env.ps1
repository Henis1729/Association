# PowerShell script to create Backend .env file
$envContent = @"
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

$envContent | Out-File -FilePath "Backend\.env" -Encoding utf8 -NoNewline
Write-Host "Backend .env file created successfully!" -ForegroundColor Green

