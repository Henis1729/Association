# 🚀 Vercel Deployment Guide

Complete guide to deploy Association platform to Vercel.

## 📚 What is Vercel?

**Vercel** is a cloud platform for deploying:
- Frontend applications as static sites
- Backend APIs as serverless functions
- Automatic HTTPS, scaling, and deployments

**Key Benefits:**
- Free tier available
- Auto-deploy on git push
- Automatic HTTPS
- Global CDN
- Serverless functions (no server management)

## 📋 Prerequisites

1. **GitHub Account** - https://github.com
2. **Vercel Account** - https://vercel.com (sign up with GitHub)
3. **MongoDB Atlas Account** - https://www.mongodb.com/cloud/atlas (free tier)

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a **free cluster** (M0 tier)
3. **Database Access**: Create database user
   - Username: `association_user`
   - Password: Generate secure password (save it!)
   - Privileges: Read and write to any database
4. **Network Access**: Add IP `0.0.0.0/0` (allows all IPs)
5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/association?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password

## 🔧 Step 2: Deploy Backend to Vercel

### 2.1 Push Code to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2.2 Create Vercel Project for Backend

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import your GitHub repository
4. **Configure:**
   - **Framework Preset**: Other
   - **Root Directory**: `Backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

### 2.3 Set Environment Variables

Go to **Settings** → **Environment Variables**, add:

```
PROJECT_NAME=association
NODE_ENV=production
PORT=3000
JSON_BODY_LIMIT=10mb
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/association?retryWrites=true&w=majority
BASE_URL=/api/v1
JWT_SECRET=generate-random-32-character-secret-here
JWT_EXPIRES_IN=7d
LOG_REQUEST_DATA=false
```

**Important:**
- Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
- Generate `JWT_SECRET`: https://generate-secret.vercel.app/32
- Or use: `openssl rand -base64 32`

### 2.4 Deploy

Click **"Deploy"** and wait for completion.

**Your backend URL will be:**
`https://your-backend-project-name.vercel.app/api/v1`

**Copy this URL!** You'll need it for the frontend.

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Project for Frontend

1. Click **"Add New Project"** again
2. Import the **same** GitHub repository
3. **Configure:**
   - **Framework Preset**: Create React App
   - **Root Directory**: `Fronend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 3.2 Set Environment Variable

Add:
```
REACT_APP_API_URL=https://your-backend-project-name.vercel.app/api/v1
```

**Replace** `your-backend-project-name` with your actual backend project name.

### 3.3 Deploy

Click **"Deploy"** and wait for completion.

**Your frontend URL will be:**
`https://your-frontend-project-name.vercel.app`

## ✅ Step 4: Test Deployment

1. Visit your frontend URL
2. Test registration
3. Test login
4. Browse listings
5. Post new listings

## 🔍 Step 5: Verify Backend Health

Visit:
```
https://your-backend.vercel.app/api/health
```

Should return:
```json
{
  "status": "healthy",
  "allVariablesSet": true
}
```

If it shows missing variables, check your environment variables in Vercel.

## 🐛 Troubleshooting

### Backend Returns 500 Error

1. **Check Function Logs**:
   - Vercel Dashboard → Deployments → Click deployment → Functions tab
   - Look for error messages

2. **Common Issues**:
   - Missing environment variables → Add them in Vercel settings
   - Wrong MongoDB URI → Verify connection string
   - MongoDB IP not whitelisted → Add `0.0.0.0/0` in MongoDB Atlas

3. **Health Check**:
   - Visit `/api/health` endpoint
   - It will show which environment variables are missing

### Frontend Can't Connect to Backend

1. Check `REACT_APP_API_URL` matches your backend URL exactly
2. Verify backend is deployed and accessible
3. Check browser console (F12) for CORS errors
4. Ensure backend URL includes `/api/v1`

### Database Connection Fails

1. **MongoDB Atlas Network Access**:
   - Must include IP: `0.0.0.0/0`
   - Wait 1-2 minutes after adding

2. **Connection String**:
   - Format must be: `mongodb+srv://user:pass@cluster.net/dbname`
   - Replace `<password>` with actual password
   - Verify username and password are correct

3. **Database User**:
   - Must have read/write permissions
   - Password must be correct

### Logger Error: "mkdir 'logs'"

**Fixed!** The logger is now configured for serverless environments and won't try to create log directories.

## 🔄 Updating Environment Variables

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add/Edit variables
3. **Important**: Click **"Redeploy"** button to apply changes
   - Or push a new commit to trigger auto-deploy

## 📝 Project URLs After Deployment

**Backend API:**
- Base: `https://your-backend.vercel.app`
- API: `https://your-backend.vercel.app/api/v1`
- Health: `https://your-backend.vercel.app/api/health`

**Frontend:**
- App: `https://your-frontend.vercel.app`

## 🔐 Environment Variables Summary

### Backend Required Variables:
- `PROJECT_NAME` - Project name
- `NODE_ENV` - `production`
- `PORT` - `3000`
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secure random string (32+ chars)
- `BASE_URL` - `/api/v1`
- `JSON_BODY_LIMIT` - `10mb`
- `JWT_EXPIRES_IN` - `7d`
- `LOG_REQUEST_DATA` - `false`

### Frontend Required Variables:
- `REACT_APP_API_URL` - Your backend URL + `/api/v1`

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB user created and password saved
- [ ] MongoDB IP whitelist includes `0.0.0.0/0`
- [ ] Backend project created in Vercel
- [ ] All backend environment variables set
- [ ] Backend deployed successfully
- [ ] Backend health check passes
- [ ] Frontend project created in Vercel
- [ ] Frontend environment variable set (with backend URL)
- [ ] Frontend deployed successfully
- [ ] Frontend can connect to backend
- [ ] User registration works
- [ ] All features working

## 🚀 Next Steps

1. **Custom Domain**: Add your domain in Vercel project settings
2. **Monitor**: Check Vercel Analytics
3. **Auto-Deploy**: Every git push automatically deploys
4. **Seed Data**: Run seed script to populate test data

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Check Logs**: Vercel Dashboard → Deployments → Functions tab

---

**Ready to deploy?** Follow the steps above and your app will be live! 🎉

