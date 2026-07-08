import { Request, Response } from 'express';
import * as Setting from '../models/settingsModel';
import { asyncHandler } from '../utils/errors';

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await Setting.getAll();
  // Convert array to object for easier consumption
  const settingsObj = settings.reduce((acc: any, curr) => {
    let val = curr.value;
    if (curr.type === 'json') {
      try {
        val = JSON.parse(curr.value);
      } catch (e) {
        val = curr.value;
      }
    }
    acc[curr.key] = val;
    return acc;
  }, {});
  res.json(settingsObj);
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = Object.entries(req.body).map(([key, value]) => ({
    key,
    value
  }));
  await Setting.updateBulk(settings);
  res.json({ message: 'Settings updated successfully' });
});
