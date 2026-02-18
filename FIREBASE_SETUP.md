# 🔥 Quick Firebase Setup Guide

## ✅ Your Firebase Project is Already Configured!

**Project ID**: `mern-39daf`  
**Database URL**: `https://mern-39daf-default-rtdb.asia-southeast1.firebasedatabase.app`  
**Region**: Asia Southeast 1

---

## 📝 Step 1: Get Your Firebase Web App Config

1. Go to Firebase Console:
   👉 **https://console.firebase.google.com/project/mern-39daf/settings/general**

2. Scroll down to **"Your apps"** section

3. **If you see a web app** (</> icon):
   - Click on the web app name
   - Find the `firebaseConfig` object
   - Copy the values

4. **If you DON'T see a web app**:
   - Click the **"</>"** (Web) button
   - Name it: `Personal Finance Tracker`
   - Don't check "Firebase Hosting"
   - Click "Register app"
   - Copy the `firebaseConfig` values

---

## 📋 Step 2: Update Your `.env` File

Open the file: `c:\Users\soura\Desktop\Personal Finance Tracker\.env`

Replace **ONLY these 3 values** with your actual config:

```bash
VITE_FIREBASE_API_KEY=paste_your_api_key_here
VITE_FIREBASE_MESSAGING_SENDER_ID=paste_your_sender_id_here
VITE_FIREBASE_APP_ID=paste_your_app_id_here
```

**The following are already correct** (don't change):
- ✅ `VITE_FIREBASE_AUTH_DOMAIN=mern-39daf.firebaseapp.com`
- ✅ `VITE_FIREBASE_DATABASE_URL=https://mern-39daf-default-rtdb.asia-southeast1.firebasedatabase.app`
- ✅ `VITE_FIREBASE_PROJECT_ID=mern-39daf`
- ✅ `VITE_FIREBASE_STORAGE_BUCKET=mern-39daf.appspot.com`

---

## 🔐 Step 3: Enable Authentication

1. Go to Authentication:
   👉 **https://console.firebase.google.com/project/mern-39daf/authentication**

2. Click **"Get Started"** (if not already enabled)

3. Enable **Email/Password**:
   - Click "Email/Password" provider
   - Toggle **Enable**
   - Click **Save**

4. Enable **Google Sign-In**:
   - Click "Google" provider
   - Toggle **Enable**
   - Select your project support email
   - Click **Save**

---

## 🗄️ Step 4: Set Database Security Rules

Your Realtime Database is already created! Now add security rules:

1. Go to Database Rules:
   👉 **https://console.firebase.google.com/project/mern-39daf/database/mern-39daf-default-rtdb/rules**

2. Replace the rules with this:

```json
{
  "rules": {
    "transactions": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    }
  }
}
```

3. Click **"Publish"**

**What this does**: Each user can only read/write their own transactions stored under their user ID.

---

## 🚀 Step 5: Run the App!

The dev server is already running! Just:

1. **Save the `.env` file** after updating the 3 values
2. **Refresh your browser** at `http://localhost:5173`
3. **Sign up** with an email or Google account
4. **Start adding transactions!**

---

## 🎯 Quick Test Checklist

After completing the above steps:

- [ ] Go to `http://localhost:5173`
- [ ] Click "Sign up" and create an account
- [ ] You should be redirected to the dashboard
- [ ] Click the **+** (FAB) button to add a transaction
- [ ] Fill the form and submit
- [ ] Transaction should appear immediately
- [ ] Open Firebase Console → Realtime Database
- [ ] You should see your transaction under `transactions/{your-user-id}/`

---

## 🔍 Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"
- ✅ Check that you copied the correct API key from Firebase Console
- ✅ Make sure there are no extra spaces in the `.env` file
- ✅ Restart the dev server after updating `.env`

### Error: "PERMISSION_DENIED"
- ✅ Make sure you published the database security rules (Step 4)
- ✅ Verify you're logged in (check navbar for your email)

### Transactions not appearing
- ✅ Open browser console (F12) and check for errors
- ✅ Verify Authentication is enabled (Step 3)
- ✅ Check Database Rules are published (Step 4)

---

## 📊 Data Structure in Realtime Database

Your data is organized like this:

```
mern-39daf-default-rtdb/
└── transactions/
    └── {userId}/
        ├── {transactionId1}/
        │   ├── title: "Grocery shopping"
        │   ├── amount: 2500
        │   ├── category: "food"
        │   ├── type: "expense"
        │   ├── date: "2026-02-17"
        │   ├── userId: {userId}
        │   └── createdAt: timestamp
        └── {transactionId2}/
            └── ...
```

Each user's transactions are isolated and secure! 🔒

---

## ✅ You're All Set!

Once you complete Steps 1-4, your Personal Finance Tracker will be fully functional with:
- 🔐 Secure authentication
- 💾 Real-time data sync
- 📊 Beautiful charts and analytics
- 🎨 Premium UI with glassmorphism
- 🌙 Dark/Light mode

Enjoy your fintech dashboard! 🚀
