import { Request, Response } from 'express';
import * as Page from '../models/pageModel';
import { asyncHandler } from '../utils/errors';

const parsePageContent = (page: any) => {
  if (page && typeof page.content === 'string') {
    try {
      page.content = JSON.parse(page.content);
    } catch (e) {
      console.error('Error parsing page content:', e);
    }
  }
  return page;
};

export const getPageBySlug = asyncHandler(async (req: Request, res: Response) => {
  const page = await Page.getBySlug(req.params.slug as string);
  if (!page) {
    return res.status(404).json({ message: 'Page not found' });
  }
  res.json(parsePageContent(page));
});

export const updatePageBySlug = asyncHandler(async (req: Request, res: Response) => {
  const success = await Page.updateBySlug(req.params.slug as string, req.body as any);
  if (!success) {
    const existing = await Page.getBySlug(req.params.slug as string);
    if (!existing) {
      await Page.create({ ...req.body, slug: req.params.slug as string } as any);
      const newPage = await Page.getBySlug(req.params.slug as string);
      return res.status(201).json(parsePageContent(newPage));
    }
    return res.status(404).json({ message: 'Page not found or no changes made' });
  }
  const updatedPage = await Page.getBySlug(req.params.slug as string);
  res.json(parsePageContent(updatedPage));
});
