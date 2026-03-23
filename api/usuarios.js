const usuarios = [
  { id: 1, nombre: 'Ana García', email: 'ana@ejemplo.com', rol: 'admin' },
  { id: 2, nombre: 'Carlos López', email: 'carlos@ejemplo.com', rol: 'usuario' },
  { id: 3, nombre: 'María Martínez', email: 'maria@ejemplo.com', rol: 'usuario' },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const { method, query } = req;

  if (method === 'GET') {
    if (query.id) {
      const usuario = usuarios.find(u => u.id === parseInt(query.id));
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      return res.status(200).json(usuario);
    }
    return res.status(200).json(usuarios);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).json({ error: `Método ${method} no permitido` });
}
