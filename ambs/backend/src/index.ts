// 1. Load environment variables at the ABSOLUTE BEGINNING - EXACTLY LIKE REFERENCE
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

// 2. Now import other packages
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './utils/errors';
import pool from './config/db';

// Routes
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import logoRoutes from './routes/logoRoutes';
import pageRoutes from './routes/pageRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import faqRoutes from './routes/faqRoutes';
import settingsRoutes from './routes/settingsRoutes';
import manufacturerRoutes from './routes/manufacturerRoutes';
import mediaRoutes from './routes/mediaRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// STATIC FILES (BEFORE PREFIX STRIP)
// ==========================================
// Production structure: Root is where app.js is. uploads is in root.
const uploadsPath = path.join(process.cwd(), 'uploads');
console.log('App Root (CWD):', process.cwd());
console.log('Serving static files from:', uploadsPath);

app.use('/lambs-api/uploads', express.static(uploadsPath));
app.use('/uploads', express.static(uploadsPath));
app.use((req, res, next) => {
  const prefixes = ['/lambs-api'];
  for (const prefix of prefixes) {
    if (req.url.startsWith(prefix)) {
      req.url = req.url.substring(prefix.length) || '/';
      break;
    }
  }
  next();
});

// Routes
const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/services', serviceRoutes);
apiRouter.use('/inquiries', inquiryRoutes);
apiRouter.use('/logos', logoRoutes);
apiRouter.use('/pages', pageRoutes);
apiRouter.use('/testimonials', testimonialRoutes);
apiRouter.use('/faqs', faqRoutes);
apiRouter.use('/settings', settingsRoutes);
apiRouter.use('/manufacturers', manufacturerRoutes);
apiRouter.use('/media', mediaRoutes);
apiRouter.use('/dashboard', dashboardRoutes);

app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Test DB endpoint
app.get('/test-db', async (req, res) => {
  try {
    console.log('Test DB endpoint called');
    console.log('Current working directory:', process.cwd());
    console.log('Environment variables available:');
    console.log('- DB_HOST:', process.env.DB_HOST);
    console.log('- DB_USER:', process.env.DB_USER);
    console.log('- DB_NAME:', process.env.DB_NAME);
    console.log('- DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***');

    const [rows]: any = await pool.execute('SELECT 1 as test');
    console.log('DB test query successful');

    // Also test users and pages tables
    let usersCount = 0, pagesCount = 0;
    try {
      const [users]: any = await pool.execute('SELECT COUNT(*) as count FROM users');
      usersCount = users[0].count;
    } catch (err) {
      console.warn('Error counting users:', err.message);
    }
    try {
      const [pages]: any = await pool.execute('SELECT COUNT(*) as count FROM pages');
      pagesCount = pages[0].count;
    } catch (err) {
      console.warn('Error counting pages:', err.message);
    }

    res.json({ 
      status: 'ok', 
      db_connected: true, 
      test_result: rows[0],
      users_count: usersCount,
      pages_count: pagesCount,
      env_vars: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME
      }
    });
  } catch (error: any) {
    console.error('Database connection test failed:', error);
    res.status(500).json({ 
      status: 'error', 
      db_connected: false, 
      error: error.message,
      stack: error.stack,
      env_vars: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME
      }
    });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Lambs Machine Works API is running...');
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
