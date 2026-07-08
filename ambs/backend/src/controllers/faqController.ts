import { Request, Response } from 'express';
import * as FAQ from '../models/faqModel';
import { asyncHandler } from '../utils/errors';

export const getFAQs = asyncHandler(async (req: Request, res: Response) => {
  const faqs = await FAQ.getAll();
  const faqsArray = Array.isArray(faqs) ? faqs : [];
  res.json(faqsArray);
});

export const createFAQ = asyncHandler(async (req: Request, res: Response) => {
  const id = await FAQ.create(req.body);
  const newFAQ = await FAQ.getById(id);
  res.status(201).json(newFAQ);
});

export const updateFAQ = asyncHandler(async (req: Request, res: Response) => {
  const { question, answer, status } = req.body;
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid FAQ ID' });
  }

  const success = await FAQ.update(id, { question, answer, status });
  
  // Note: if values are the same, success might be false but it's not an error.
  // However, FAQ.update returns true if no fields were provided.
  // We'll just fetch the current state regardless of affectedRows.
  
  const updatedFAQ = await FAQ.getById(id);
  if (!updatedFAQ) {
    return res.status(404).json({ message: 'FAQ not found' });
  }
  
  res.json(updatedFAQ);
});

export const deleteFAQ = asyncHandler(async (req: Request, res: Response) => {
  const success = await FAQ.remove(Number(req.params.id));
  if (!success) {
    return res.status(404).json({ message: 'FAQ not found' });
  }
  res.json({ message: 'FAQ deleted successfully' });
});
