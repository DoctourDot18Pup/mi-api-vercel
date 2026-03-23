import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { method, query } = req;

  if (method === 'GET') {
    if (query.categoria) {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .ilike('categoria', query.categoria);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).json({ error: `Método ${method} no permitido` });
}
