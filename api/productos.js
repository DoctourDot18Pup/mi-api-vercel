import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { method, query } = req;

  // GET
  if (method === 'GET') {
    if (query.id) {
      const { data, error } = await supabase.from('productos').select('*').eq('id', query.id).single();
      if (error) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.status(200).json(data);
    }
    let q = supabase.from('productos').select('*').order('id');
    if (query.categoria) q = q.ilike('categoria', query.categoria);
    const { data, error } = await q;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // POST
  if (method === 'POST') {
    const { nombre, precio, categoria } = req.body;
    if (!nombre || !precio || !categoria) return res.status(400).json({ error: 'nombre, precio y categoria son requeridos' });
    const { data, error } = await supabase.from('productos').insert([{ nombre, precio, categoria }]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  // PUT
  if (method === 'PUT') {
    if (!query.id) return res.status(400).json({ error: 'Se requiere ?id=' });
    const { nombre, precio, categoria } = req.body;
    const { data, error } = await supabase.from('productos').update({ nombre, precio, categoria }).eq('id', query.id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // DELETE
  if (method === 'DELETE') {
    if (!query.id) return res.status(400).json({ error: 'Se requiere ?id=' });
    const { error } = await supabase.from('productos').delete().eq('id', query.id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ mensaje: 'Producto eliminado' });
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).json({ error: `Método ${method} no permitido` });
}
