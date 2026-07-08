import { Request, Response } from 'express';
import * as Manufacturer from '../models/manufacturerModel';
import { asyncHandler } from '../utils/errors';

const parseContent = (manufacturer: any) => {
  if (manufacturer && typeof manufacturer.content === 'string') {
    try {
      manufacturer.content = JSON.parse(manufacturer.content);
    } catch (e) {
      console.error('Error parsing manufacturer content:', e);
    }
  }
  return manufacturer;
};

export const getManufacturers = asyncHandler(async (req: Request, res: Response) => {
  const manufacturers = await Manufacturer.getAll();
  res.json((manufacturers as any[]).map(parseContent));
});

export const getManufacturerBySlug = asyncHandler(async (req: Request, res: Response) => {
  const manufacturer = await Manufacturer.getBySlug(req.params.slug as string);
  if (!manufacturer) {
    return res.status(404).json({ message: 'Manufacturer not found' });
  }
  res.json(parseContent(manufacturer));
});

export const createManufacturer = asyncHandler(async (req: Request, res: Response) => {
  const id = await Manufacturer.create(req.body as any);
  const newManufacturer = await Manufacturer.getById(id);
  res.status(201).json(parseContent(newManufacturer));
});

export const updateManufacturer = asyncHandler(async (req: Request, res: Response) => {
  const success = await Manufacturer.update(Number(req.params.id), req.body as any);
  if (!success) {
    return res.status(404).json({ message: 'Manufacturer not found or no changes made' });
  }
  const updated = await Manufacturer.getById(Number(req.params.id));
  res.json(parseContent(updated));
});

export const deleteManufacturer = asyncHandler(async (req: Request, res: Response) => {
  const success = await Manufacturer.remove(Number(req.params.id));
  if (!success) {
    return res.status(404).json({ message: 'Manufacturer not found' });
  }
  res.json({ message: 'Manufacturer deleted successfully' });
});
