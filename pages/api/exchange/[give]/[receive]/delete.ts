import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'ID required' });

  db.prepare('DELETE FROM entries WHERE id = ?').run(id);
  res.status(200).json({ success: true });
}