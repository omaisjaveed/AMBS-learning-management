import { Request, Response } from 'express';
import * as Service from '../models/serviceModel';
import { asyncHandler } from '../utils/errors';

const parseServiceContent = (service: any) => {
  if (service && typeof service.content === 'string') {
    try {
      service.content = JSON.parse(service.content);
    } catch (e) {
      console.error('Error parsing service content:', e);
    }
  }
  return service;
};

export const getServices = asyncHandler(async (req: Request, res: Response) => {
  const services = await Service.getAll();
  const servicesArray = Array.isArray(services) ? services : [];
  res.json(servicesArray.map(parseServiceContent));
});

export const getService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  let service;
  
  if (!isNaN(Number(id))) {
    service = await Service.getById(Number(id));
  } else {
    // Try to find by slug if id is not a number
    // Note: The slug might contain slashes like 'repair-shop/blowers'
    // But express params by default don't match slashes.
    // However, if we call it with the full slug, it might work if the route is defined correctly.
    service = await Service.getBySlug(id as string);
  }

  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(parseServiceContent(service));
});

export const getServiceBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { category, slug } = req.params;
  const fullSlug = `${category}/${slug}`;
  const service = await Service.getBySlug(fullSlug);
  
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(parseServiceContent(service));
});

export const createService = asyncHandler(async (req: Request, res: Response) => {
  const data = { ...req.body };
  if (data.content && typeof data.content !== 'string') {
    data.content = JSON.stringify(data.content);
  }
  const id = await Service.create(data as any);
  const newService = await Service.getById(id);
  res.status(201).json(parseServiceContent(newService));
});

export const updateService = asyncHandler(async (req: Request, res: Response) => {
  const data = { ...req.body };
  if (data.content && typeof data.content !== 'string') {
    data.content = JSON.stringify(data.content);
  }
  const success = await Service.update(Number(req.params.id), data as any);
  if (!success) {
    return res.status(404).json({ message: 'Service not found or no changes made' });
  }
  const updatedService = await Service.getById(Number(req.params.id));
  res.json(parseServiceContent(updatedService));
});

export const deleteService = asyncHandler(async (req: Request, res: Response) => {
  const success = await Service.remove(Number(req.params.id));
  if (!success) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json({ message: 'Service deleted successfully' });
});
