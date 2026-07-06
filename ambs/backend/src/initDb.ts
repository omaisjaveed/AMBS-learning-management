import pool from './config/db';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const initDb = async () => {
  try {
    const schemaPath = path.join(__dirname, 'config/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split schema into individual queries
    const queries = schema
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    console.log('Initializing database...');

    for (const query of queries) {
      await pool.execute(query);
    }

    console.log('Database tables created successfully.');

    // Seed admin user if not exists
    const [users]: any = await pool.execute('SELECT * FROM users WHERE email = ?', ['admin@lambs.com']);
    
    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.execute(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@lambs.com', hashedPassword, 'admin']
      );
      console.log('Default admin user created (admin@lambs.com / admin123).');
    }

    // Seed some initial settings if needed
    const settings = [
      { key: 'site_name', value: "Lamb's Machine Works", type: 'text' },
      { key: 'contact_email', value: 'info@lambsmachine.com', type: 'text' },
      { key: 'contact_phone', value: '(123) 456-7890', type: 'text' },
      { key: 'address', value: '123 Industrial Way, City, State', type: 'text' }
    ];

    for (const setting of settings) {
      await pool.execute(
        'INSERT IGNORE INTO settings (`key`, `value`, `type`) VALUES (?, ?, ?)',
        [setting.key, setting.value, setting.type]
      );
    }

    // Seed Home Page
    const [pages]: any = await pool.execute('SELECT * FROM pages WHERE slug = ?', ['home']);
    if (pages.length === 0) {
      const homeContent = {
        hero: {
          title: "Precision Machining & Repair Solutions",
          subtitle: "The Mid-South's trusted leader since 1976. Authorized Roots Distributor & Service Center specializing in blowers, airlocks, and custom fabrication.",
          bg_image: "https://ik.imagekit.io/ofvhaiwug/Hero-Banner.jpg.webp",
          cta_text: "Request a Quote",
          cta_url: "/contact"
        },
        seo: {
          title: "Industrial Equipment Repair & Service",
          description: "Lamb's Machine Works specializes in Roots blowers, airlocks, and custom fabrication for Tennessee, Mississippi, and Arkansas."
        },
        about: {
          heading: "Nearly 50 Years of Excellence.",
          description: "Founded in 1976, Lamb's Machine Works is the Mid-South's trusted leader in industrial equipment repair and service. We specialize in Roots blowers, airlocks, feeders, pumps, and gearboxes. We keep your operations running with fast, reliable solutions backed by decades of expertise.",
          image_1: "https://ik.imagekit.io/ofvhaiwug/Machine-Shop-Services.jpg.webp",
          image_2: "https://res.cloudinary.com/dxyaxgbjl/video/upload/f_auto,q_auto/v1777927410/IMG_8842_wzgzzs.jpg",
          video_url: "https://res.cloudinary.com/dxyaxgbjl/video/upload/v1777927410/IMG_8842_wzgzzs.mp4"
        },
        bottom_cta: {
          heading: "Ready to elevate your industrial operations?",
          description: "Contact our engineering and fabrication team today for rapid emergency service, detailed quotes, or custom solutions.",
          btn1_text: "Contact Us Now",
          btn1_url: "/contact"
        }
      };
      await pool.execute(
        'INSERT INTO pages (title, slug, content) VALUES (?, ?, ?)',
        ['Home', 'home', JSON.stringify(homeContent)]
      );
      console.log('Home page seeded.');
    }

    console.log('Database initialization complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDb();
