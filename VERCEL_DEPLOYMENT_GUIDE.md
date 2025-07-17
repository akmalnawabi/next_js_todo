# Vercel Deployment Guide - Fixing 500 Error

## What is a 500 Error?

A **500 Internal Server Error** means something went wrong on the server side. In your case, it's likely related to database connection issues.

## Steps to Fix the 500 Error

### 1. Set Up Database Environment Variables

You need to configure your database connection in Vercel:

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add the following environment variable:**

```
Name: DATABASE_URL
Value: [Your PostgreSQL connection string]
```

### 2. Database Options

#### Option A: Use Vercel Postgres (Recommended)

1. In Vercel dashboard, go to **Storage**
2. Create a new **Postgres** database
3. Copy the connection string provided
4. Set it as your `DATABASE_URL` environment variable

#### Option B: Use External Database

- Use services like Supabase, PlanetScale, or Railway
- Get the connection string and set it as `DATABASE_URL`

### 3. Initialize Database Schema

After setting up the database, you need to push your schema:

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Link your project:**

   ```bash
   vercel link
   ```

3. **Push database schema:**
   ```bash
   vercel env pull .env.local
   npx prisma db push
   ```

### 4. Alternative: Use Database Migration

If you prefer migrations:

```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

### 5. Verify Database Connection

Test your database connection by visiting:

- `/api/health` - Health check endpoint
- `/api/test-db` - Database test endpoint

### 6. Redeploy

After setting up the database:

1. **Commit your changes:**

   ```bash
   git add .
   git commit -m "Fix database connection"
   git push
   ```

2. **Redeploy on Vercel** (should happen automatically)

## Common Issues and Solutions

### Issue: "Database connection failed"

**Solution:** Check your `DATABASE_URL` format and ensure the database is accessible

### Issue: "Table doesn't exist"

**Solution:** Run `npx prisma db push` to create the tables

### Issue: "Prisma client not generated"

**Solution:** The build script now includes `prisma generate` automatically

### Issue: "Environment variable not found"

**Solution:** Make sure `DATABASE_URL` is set in Vercel environment variables

## Testing Your Fix

1. Visit your Vercel deployment URL
2. Check the browser console for errors
3. Try creating a new task
4. Verify data persists after page refresh

## Monitoring

Use Vercel's built-in monitoring:

- **Functions tab** - Check for function errors
- **Logs** - View detailed error logs
- **Analytics** - Monitor performance

## Fallback Solution

If you continue having issues, you can temporarily use a simple JSON file or localStorage for development, but this won't work for production with multiple users.

## Need Help?

- Check Vercel logs in the dashboard
- Use the `/api/health` endpoint to test database connectivity
- Verify all environment variables are set correctly
