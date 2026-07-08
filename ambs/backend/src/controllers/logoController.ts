import { Request, Response } from 'express';
import * as Logo from '../models/logoModel';
import { asyncHandler } from '../utils/errors';

export const getLogos = asyncHandler(async (req: Request, res: Response) => {
  const logos = await Logo.getAll();
  const logosArray = Array.isArray(logos) ? logos : [];
  res.json(logosArray);
});

export const createLogo = asyncHandler(async (req: Request, res: Response) => {
  const id = await Logo.create(req.body);
  const newLogo = await Logo.getById(id);
  res.status(201).json(newLogo);
});

export const updateLogo = asyncHandler(async (req: Request, res: Response) => {
  const success = await Logo.update(Number(req.params.id), req.body);
  if (!success) {
    return res.status(404).json({ message: 'Logo not found' });
  }
  const updatedLogo = await Logo.getById(Number(req.params.id));
  res.json(updatedLogo);
});

export const deleteLogo = asyncHandler(async (req: Request, res: Response) => {
  const success = await Logo.remove(Number(req.params.id));
  if (!success) {
    return res.status(404).json({ message: 'Logo not found' });
  }
  res.json({ message: 'Logo deleted successfully' });
});
