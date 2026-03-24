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
      const { data, error } = await supabase.from('usuarios').select('*').eq('id', query.id).single();
      if (error) return res.status(404).json({ error: 'Usuario no encontrado' });
      return res.status(200).json(data);
    }
    const { data, error } = await supabase.from('usuarios').select('*').order('id');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // POST
  if (method === 'POST') {
    const { nombre, email, rol } = req.body;
    if (!nombre || !email) return res.status(400).json({ error: 'nombre y email son requeridos' });
    const { data, error } = await supabase.from('usuarios').insert([{ nombre, email, rol: rol || 'usuario' }]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  // PUT
  if (method === 'PUT') {
    if (!query.id) return res.status(400).json({ error: 'Se requiere ?id=' });
    const { nombre, email, rol } = req.body;
    const { data, error } = await supabase.from('usuarios').update({ nombre, email, rol }).eq('id', query.id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // DELETE
  if (method === 'DELETE') {
    if (!query.id) return res.status(400).json({ error: 'Se requiere ?id=' });
    const { error } = await supabase.from('usuarios').delete().eq('id', query.id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ mensaje: 'Usuario eliminado' });
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).json({ error: `Método ${method} no permitido` });
}
