// pages/api/docs/[slug].ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query; // Get the slug from the query parameters
  const filePath = path.join(process.cwd(), `content/${slug}.md`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.status(200).json({ content });
  } catch (error) {
    res.status(404).json({ message: 'File not found' });
  }
}
