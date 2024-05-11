// pages/api/docs1.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'content/docs1.md');
  const content = fs.readFileSync(filePath, 'utf8');
  res.status(200).json({ content });
}
