import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { give, receive } = req.query;
  const { link, discord } = req.body;
  if (!link || typeof link !== 'string') return res.status(400).json({ error: 'Link required' });

  const { data, error } = await supabase
    .from('entries')
    .insert([{ give, receive, link, discord }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ success: true, data });
}