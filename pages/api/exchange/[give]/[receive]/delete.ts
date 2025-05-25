import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();
  const { give, receive } = req.query;
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'ID required' });

  const { error } = await supabase
    .from('entries')
    .delete()
    .eq('id', id)
    .eq('give', give)
    .eq('receive', receive);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ success: true });
}