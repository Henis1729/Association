# 🏠 Association - Shared Accommodation Platform

**Full-Stack Application** connecting students and property owners for shared accommodations and roommate matching.

## 🎯 Project Overview

Association is a modern web platform that helps students find shared accommodations and compatible roommates. Built with **Node.js/Express** backend and **React** frontend, featuring a beautiful, responsive UI and complete authentication system.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- MongoDB running locally (or MongoDB Atlas account)
- Code editor (VS Code recommended)

### One-Command Setup

**Windows PowerShell:**
```powershell
.\setup-and-run.ps1
```

This automatically:
- Creates environment files
- Installs all dependencies
- Starts both servers

### Manual Setup

**1. Backend Setup:**
```bash
cd Backend
npm install

# Create .env file (see Environment Configuration below)
npm run dev
```

**2. Frontend Setup:**
```bash
cd Fronend
npm install

# Create .env file with: REACT_APP_API_URL=http://localhost:3001/api/v1
npm start
```

### Environment Configuration

**Backend `.env` file:**
```env
PROJECT_NAME=association
NODE_ENV=development
PORT=3001
JSON_BODY_LIMIT=10mb

MONGODB_URI=mongodb://localhost:27017/association
BASE_URL=/api/v1

JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRES_IN=7d

EMAIL_USER=test@test.com
EMAIL_PASSWORD=test
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

<!-- ACCESSKEYID=
SECRET_KEY=
REGION=
BUCKET= -->
```

**Frontend `.env` file:**
```env
REACT_APP_API_URL=http://localhost:3001/api/v1
```

---

## 🌐 Application URLs

### Frontend (User Interface)
**URL:** http://localhost:3000

### Backend (API Server)
**URL:** http://localhost:3001/api/v1

---

## 🏗️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt
- **File Storage**: AWS S3 (multer-s3)
- **Email Service**: Nodemailer
- **Validation**: Joi
- **Logging**: Winston

### Frontend
- **Framework**: React 18.3.1
- **Routing**: React Router DOM 7.3.0
- **Styling**: Tailwind CSS 3.4.4
- **Icons**: Lucide React
- **Build Tool**: Create React App

---

## 📁 Project Structure

```
Association/
├── Backend/                    # Node.js/Express API
│   ├── app.js                 # Express app setup
│   ├── bin/www                # Server entry
│   ├── config/                # Configuration
│   ├── controllers/           # Business logic
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API routes
│   ├── middleware/            # Auth, validation
│   ├── services/              # External services
│   └── helpers/               # Utilities
│
└── Fronend/                   # React application
    ├── src/
    │   ├── App.js            # Main app & routing
    │   ├── pages/            # Page components
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── BrowseOwners.js
    │   │   ├── BrowseTenants.js
    │   │   ├── PostAccommodation.js
    │   │   ├── PostRoommate.js
    │   │   ├── About.js
    │   │   └── Contact.js
    │   ├── Components/       # Reusable components
    │   ├── contexts/         # React contexts
    │   └── services/         # API services
    └── package.json
```

---

## ✨ Key Features

### 🔐 Authentication & Security
- User registration and login
- JWT token-based authentication
- Protected routes
- Role-based access control (User, Landlord, Admin)
- Password hashing with bcrypt
- OTP verification system

### 🏘️ Accommodation Listings
- Browse available accommodations
- Advanced filters (city, price, gender, dietary)
- Real-time search
- Property owner listings
- WhatsApp integration for direct contact

### 👥 Roommate Matching
- Browse students looking for roommates
- Filter by institute, location, preferences
- Create roommate requests
- Contact management

### 📝 Listings Management
- **Property Owners**: Post and manage accommodation listings
- **Students**: Post and manage roommate requests
- Edit and delete listings
- Active/inactive status management

### 💬 Communication Tools
- Structured WhatsApp message generator
- Pre-filled contact messages
- Direct owner/tenant contact
- Professional message templates

### 🎨 Modern UI/UX
- Beautiful, responsive design
- Mobile-first approach
- Tailwind CSS styling
- Smooth animations
- Intuitive navigation

---

## 📊 Database Models

### User Model
- Email, name, mobile, password
- Role-based access (user, landlord, admin)
- Auto-hashed passwords
- Active status management

### Owner Model
- Property details (address, city, province)
- Accommodation type (apartment, house, basement)
- Preferences (gender, dietary, laundry, parking)
- Pricing and availability
- Contact information

### Tenant Model
- Requirements (persons, rooms, budget)
- Location preferences
- Institute/University
- Preferences matching
- Contact details

### Role Model
- user, tenant, landlord, admin
- Permission management

---

## 🔌 API Endpoints

### User Management
- `POST /user/signup` - Register new user
- `POST /user/signin` - Login
- `POST /user/send-otp` - Send OTP
- `POST /user/verify-otp` - Verify OTP
- `PUT /user/update-profile` - Update profile
- `PUT /user/reset-password` - Change password
- `PUT /user/forgot-password` - Reset via OTP

### Owner Management
- `GET /owner` - List accommodations
- `POST /owner` - Create listing
- `PUT /owner` - Update listing
- `DELETE /owner` - Delete listing

### Tenant Management
- `GET /tenant` - List roommates
- `POST /tenant` - Create request
- `PUT /tenant` - Update request
- `DELETE /tenant` - Delete request

---

## 🧪 Testing the Application

### Verify Servers Are Running

**Check Status:**
```powershell
.\check-status.ps1
```

**Manual Check:**

1. **Backend:** http://localhost:3001/api/v1
   - Should return: `{"message":"Welcome to association backend APIz."}`

2. **Frontend:** http://localhost:3000
   - Should show homepage

### First User Steps

1. **Register Account**
   - Go to http://localhost:3000
   - Click "Register"
   - Choose role: Student or Property Owner
   - Fill details and submit

2. **Login**
   - Use credentials to login
   - Dashboard loads

3. **Explore Features**
   - **Students**: Browse listings or post roommate request
   - **Owners**: Post accommodation listing
   - **Everyone**: Use message generator

---

## 🐛 Troubleshooting

### Backend Won't Start
- ✓ Ensure MongoDB is running
- ✓ Check Backend/.env file exists
- ✓ Verify no syntax errors in .env
- ✓ Check Backend terminal for errors

### Frontend Won't Start
- ✓ Ensure Backend is running first
- ✓ Check Fronend/.env file exists
- ✓ Verify REACT_APP_API_URL is correct
- ✓ Check Frontend terminal for errors

### MongoDB Connection Error
- ✓ Verify MongoDB is installed and running
- ✓ Check connection string in .env
- ✓ Try MongoDB Atlas for cloud database

### Port Already in Use
```powershell
# Check what's using the port
netstat -ano | findstr :3001

# Kill specific process
taskkill /PID <process_id> /F
```

---

## 📚 Development Commands

### Backend
```bash
cd Backend
npm run dev     # Development with auto-reload
npm start       # Production mode
```

### Frontend
```bash
cd Fronend
npm start       # Development server
npm run build   # Production build
npm test        # Run tests
```

---

## 🎯 User Flow Examples

### Student Looking for Accommodation
1. Register as Student
2. Login → Dashboard
3. Browse accommodations
4. Filter by preferences
5. Contact owner via WhatsApp
6. Generate inquiry message

### Property Owner Posting Listing
1. Register as Landlord
2. Login → Dashboard
3. Click "Post Listing"
4. Fill comprehensive form
5. Submit → Listing appears in browse
6. Receive contacts from students

### Student Looking for Roommates
1. Login → Dashboard
2. Click "Find Roommates"
3. Fill roommate request
4. Submit → Appears in roommate listings
5. Get contacted by compatible students

---

## 🚀 Deployment

### Backend (Vercel)
- Configure via vercel.json
- Set environment variables
- Deploy serverless functions

### Frontend
```bash
cd Fronend
npm run build
```
- Deploy build/ folder to Vercel, Netlify, or AWS S3
- Update API URL in production .env

---

## 📝 Project Status

### ✅ Completed Features
- ✓ Full authentication system
- ✓ User registration and login
- ✓ Protected routes
- ✓ 10 complete frontend pages
- ✓ Browse and filter listings
- ✓ Post accommodations
- ✓ Post roommate requests
- ✓ WhatsApp integration
- ✓ Modern responsive UI
- ✓ API integration
- ✓ Role-based access
- ✓ Message generator
- ✓ Dashboard for all users

### 🚧 Future Enhancements
- Image upload UI
- Email verification workflow
- Advanced pagination
- Saved listings
- User reviews
- In-app messaging
- Map integration
- Notifications

---

## 🛠️ Available Scripts

### Setup Scripts
- `setup-and-run.ps1` - Complete automatic setup
- `check-status.ps1` - Verify servers are running
- `setup-backend-env.ps1` - Create Backend .env
- `setup-frontend-env.ps1` - Create Frontend .env

### Usage
```powershell
# Initial setup
.\setup-and-run.ps1

# Check status
.\check-status.ps1

# Reconfigure
.\setup-backend-env.ps1
.\setup-frontend-env.ps1
```

---

## 📖 Additional Resources

### File Structure
- Backend code fully functional
- Frontend with modern UI complete
- Environment files auto-generated
- MongoDB schemas ready
- All APIs tested and working

### Support
- Check terminal windows for server logs
- Browser console (F12) for frontend errors
- Network tab for API debugging
- MongoDB Compass for database queries

---

## 🎉 Success Checklist

- [ ] MongoDB running
- [ ] Backend started (port 3001)
- [ ] Frontend started (port 3000)
- [ ] Backend API accessible
- [ ] Frontend loads in browser
- [ ] Can register user
- [ ] Can login
- [ ] Dashboard displays
- [ ] No console errors

---

## 💡 Quick Tips

1. **Always start Backend before Frontend**
2. **Keep MongoDB running** throughout development
3. **Check .env files** if connections fail
4. **Use check-status.ps1** to verify everything
5. **Read terminal logs** for debugging

---

## 📞 Getting Help

- Check `setup-and-run.ps1` output
- Review terminal error messages
- Verify environment files exist
- Ensure MongoDB is running
- Test API endpoints manually

---

**Status:** ✅ **PRODUCTION READY**

**Last Updated:** Complete setup and configuration

**License:** MIT

**Happy Coding! 🚀**

