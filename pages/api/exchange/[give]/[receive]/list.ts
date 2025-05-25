import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const { give, receive } = req.query;

  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('give', give)
    .eq('receive', receive)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}