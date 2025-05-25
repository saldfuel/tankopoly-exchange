import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { give, receive } = req.query;
  const { link, discord } = req.body;
  if (!link || typeof link !== 'string') return res.status(400).json({ error: 'Link required' });

  const stmt = db.prepare('INSERT INTO entries (give, receive, link, discord) VALUES (?, ?, ?, ?)');
  stmt.run(give, receive, link, discord || null);

  res.status(200).json({ success: true });
}