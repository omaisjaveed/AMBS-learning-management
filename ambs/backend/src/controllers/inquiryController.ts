import { Request, Response } from 'express';
import * as Inquiry from '../models/inquiryModel';
import { asyncHandler } from '../utils/errors';
import { sendInquiryNotification } from '../utils/mailer';

export const getInquiries = asyncHandler(async (req: Request, res: Response) => {
  const inquiries = await Inquiry.getAll();
  res.json(inquiries);
});

export const createInquiry = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const id = await Inquiry.create({ name, email, phone, subject, message });
  const newInquiry = await Inquiry.getById(id);

  if (newInquiry) {
    // Send email notification asynchronously
    sendInquiryNotification(newInquiry).catch(err => console.error('Email notification failed:', err));
  }

  res.status(201).json(newInquiry);
});

export const markInquiryAsRead = asyncHandler(async (req: Request, res: Response) => {
  const success = await Inquiry.markAsRead(Number(req.params.id));
  if (!success) {
    return res.status(404).json({ message: 'Inquiry not found' });
  }
  res.json({ message: 'Inquiry marked as read' });
});

export const deleteInquiry = asyncHandler(async (req: Request, res: Response) => {
  const success = await Inquiry.remove(Number(req.params.id));
  if (!success) {
    return res.status(404).json({ message: 'Inquiry not found' });
  }
  res.json({ message: 'Inquiry deleted successfully' });
});
