import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { give, receive } = req.query;
  const stmt = db.prepare('SELECT id, link, discord, created_at FROM entries WHERE give = ? AND receive = ? ORDER BY created_at DESC LIMIT 1000');
  const entries = stmt.all(give, receive);
  res.status(200).json(entries);
}