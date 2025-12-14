# 🚀 Deployment Guide for AI Quiz Generator

## 📋 Prerequisites

Before deploying, make sure you have:

- ✅ GitHub account (phoenix1185)
- ✅ Koyeb account (free tier available)
- ✅ Docker Hub account (optional, for manual deployment)
- ✅ All code pushed to GitHub repository

---

## 🎯 Method 1: Koyeb Git-Based Deployment (Recommended)

### Step 1: Prepare Your Repository

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `ai-quiz-generator`
   - Description: `AI-powered quiz generator with multi-engine support`
   - Make it **Public** (Koyeb free tier works with public repos)
   - Click "Create repository"

2. **Push your code to GitHub**
   ```bash
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit: AI Quiz Generator"
   
   # Add remote and push
   git remote add origin https://github.com/phoenix1185/ai-quiz-generator.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Koyeb

1. **Sign up/login to Koyeb**
   - Go to https://www.koyeb.com
   - Sign up with GitHub (easiest) or email
   - Verify your email if required

2. **Create a new Koyeb App**
   - Click **"Create App"** in the dashboard
   - Select **"Git"** as deployment method
   - Click **"Connect GitHub"** and authorize Koyeb
   - Select your repository: `phoenix1185/ai-quiz-generator`
   - Select branch: `main`

3. **Configure deployment settings**
   - **Build type**: Dockerfile (auto-detected)
   - **Port**: 3000 (auto-detected)
   - **Instance type**: nano (free tier)
   - **Regions**: WAS (Washington) - closest to most users
   - **Environment variables**:
     ```
     NODE_ENV=production
     PORT=3000
     ```

4. **Deploy**
   - Click **"Deploy"**
   - Wait for the build to complete (2-3 minutes)
   - Your app will be available at: `https://ai-quiz-generator-xxxx.koyeb.app`

### Step 3: Verify Deployment

1. **Check your app URL**
   - Open the provided Koyeb URL
   - You should see the AI Quiz Generator interface
   - Test by typing: `quiz space exploration`

2. **Monitor deployment**
   - Go to Koyeb Dashboard → Your App
   - Check "Logs" for any errors
   - Monitor "Metrics" for performance

---

## 🐳 Method 2: Docker Hub + Koyeb (Alternative)

### Step 1: Build and Push Docker Image

1. **Install Docker** if not already installed
   - Windows/Mac: Download from https://docker.com
   - Linux: `sudo apt-get install docker.io`

2. **Login to Docker Hub**
   ```bash
   docker login
   # Enter your Docker Hub username and password
   ```

3. **Build the Docker image**
   ```bash
   docker build -t phoenix1185/ai-quiz-generator:latest .
   ```

4. **Push to Docker Hub**
   ```bash
   docker push phoenix1185/ai-quiz-generator:latest
   ```

### Step 2: Deploy to Koyeb using Docker Image

1. **Create new Koyeb App**
   - Click **"Create App"**
   - Select **"Docker"** as deployment method
   - **Image**: `phoenix1185/ai-quiz-generator:latest`
   - **Port**: 3000
   - **Instance type**: nano
   - Click **"Deploy"**

---

## 🔧 Method 3: Koyeb CLI Deployment

### Step 1: Install Koyeb CLI
