import { Request, Response } from 'express';
import pool from '../config/db';
import { asyncHandler } from '../utils/errors';

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const [services]: any = await pool.query('SELECT COUNT(*) as count FROM services');
  const [industries]: any = await pool.query('SELECT COUNT(*) as count FROM pages WHERE slug LIKE "industries-served%"'); // This might be different depending on schema
  // Let's re-check schema for industries. Based on previous work, industries were a page content array.
  // However, I will check the actual tables.
  
  const [faqs]: any = await pool.query('SELECT COUNT(*) as count FROM faqs');
  const [testimonials]: any = await pool.query('SELECT COUNT(*) as count FROM testimonials');
  const [inquiries]: any = await pool.query('SELECT COUNT(*) as count FROM inquiries');
  const [media]: any = await pool.query('SELECT COUNT(*) as count FROM media');
  const [manufacturers]: any = await pool.query('SELECT COUNT(*) as count FROM manufacturers');

  // For industries, let's re-verify if there is a separate table or if it's just the page content.
  // Based on LS results, there is no industryModel.ts, so it's likely page content.
  // We can fetch the industries-served page and count the industries array.
  const [industriesPage]: any = await pool.query('SELECT content FROM pages WHERE slug = "industries-served"');
  let industryCount = 0;
  if (industriesPage.length > 0) {
    try {
      const content = typeof industriesPage[0].content === 'string' ? JSON.parse(industriesPage[0].content) : industriesPage[0].content;
      industryCount = content?.industries?.length || 0;
    } catch (e) {
      industryCount = 0;
    }
  }

  const [recentInquiries]: any = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5');

  res.json({
    stats: {
      services: services[0].count,
      industries: industryCount,
      manufacturers: manufacturers[0].count,
      faqs: faqs[0].count,
      testimonials: testimonials[0].count,
      inquiries: inquiries[0].count,
      media: media[0].count
    },
    recentInquiries
  });
});
