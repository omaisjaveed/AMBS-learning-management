import { Request, Response } from 'express';
import * as Testimonial from '../models/testimonialModel';
import { asyncHandler } from '../utils/errors';

export const getTestimonials = asyncHandler(async (req: Request, res: Response) => {
  const testimonials = await Testimonial.getAll();
  const testimonialsArray = Array.isArray(testimonials) ? testimonials : [];
  res.json(testimonialsArray);
});

export const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const id = await Testimonial.create(req.body);
  const newTestimonial = await Testimonial.getById(id);
  res.status(201).json(newTestimonial);
});

export const updateTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const success = await Testimonial.update(Number(req.params.id), req.body);
  if (!success) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  const updatedTestimonial = await Testimonial.getById(Number(req.params.id));
  res.json(updatedTestimonial);
});

export const deleteTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const success = await Testimonial.remove(Number(req.params.id));
  if (!success) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  res.json({ message: 'Testimonial deleted successfully' });
});
