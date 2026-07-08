import { Request, Response } from 'express';
import * as Media from '../models/mediaModel';
import { asyncHandler } from '../utils/errors';
import path from 'path';
import fs from 'fs/promises';

export const getMedia = asyncHandler(async (req: Request, res: Response) => {
  const media = await Media.getAll();
  res.json(media);
});

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.file;
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
  const url = `${baseUrl}/uploads/${file.filename}`;

  const mediaId = await Media.create({
    filename: file.filename,
    url: url,
    alt_text: req.body.alt_text || file.originalname,
    mime_type: file.mimetype,
    file_size: file.size
  });

  const newMedia = await Media.getById(mediaId);
  res.status(201).json(newMedia);
});

export const updateMediaAlt = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { alt_text } = req.body;

  const success = await Media.updateAltText(Number(id), alt_text);
  if (!success) {
    return res.status(404).json({ message: 'Media not found' });
  }

  const updatedMedia = await Media.getById(Number(id));
  res.json(updatedMedia);
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const media = await Media.getById(Number(id));

  if (!media) {
    return res.status(404).json({ message: 'Media not found' });
  }

  // Delete file from filesystem
  const filePath = path.join(process.cwd(), 'uploads', media.filename);
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(`Failed to delete file: ${filePath}`, err);
    // Continue deleting from DB even if file deletion fails
  }

  await Media.remove(Number(id));
  res.json({ message: 'Media deleted successfully' });
});
