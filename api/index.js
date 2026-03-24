export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(getHTML());
}

function getHTML() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>mi-api-vercel</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0a0a0a; --surface: #111111; --border: #222222; --border-light: #2a2a2a;
      --text: #f0f0f0; --muted: #555555; --accent: #ffffff;
      --danger: #ff4444; --success: #44ff88; --warning: #ffaa00;
    }
    html, body { height: 100%; background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }
    .app { display: grid; grid-template-columns: 220px 1fr; grid-template-rows: 56px 1fr; min-height: 100vh; }
    .topbar { grid-column: 1 / -1; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 28px; background: var(--bg); position: sticky; top: 0; z-index: 10; }
    .topbar-brand { font-family: 'DM Mono', monospace; font-size: 13px; letter-spacing: 0.08em; }
    .topbar-brand span { color: var(--muted); }
    .topbar-status { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); font-family: 'DM Mono', monospace; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .sidebar { border-right: 1px solid var(--border); padding: 24px 0; background: var(--surface); }
    .sidebar-section { padding: 0 16px; margin-bottom: 24px; }
    .sidebar-label { font-size: 10px; letter-spacing: 0.12em; color: var(--muted); text-transform: uppercase; font-family: 'DM Mono', monospace; margin-bottom: 8px; padding: 0 8px; }
    .nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; color: var(--muted); transition: all 0.15s; border: 1px solid transparent; font-family: 'DM Mono', monospace; margin-bottom: 2px; }
    .nav-item:hover { color: var(--text); background: var(--border); }
    .nav-item.active { color: var(--text); background: var(--border); border-color: var(--border-light); }
    .nav-icon { font-size: 14px; opacity: 0.7; }
    .nav-badge { margin-left: auto; font-size: 10px; background: var(--border-light); color: var(--muted); padding: 2px 6px; border-radius: 10px; }
    .main { padding: 32px 40px; overflow-y: auto; }
    .page-header { margin-bottom: 32px; animation: fadeUp 0.4s ease; }
    .page-title { font-size: 22px; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 4px; }
    .page-sub { font-size: 13px; color: var(--muted); font-family: 'DM Mono', monospace; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px; }
    .stat-card { border: 1px solid var(--border); border-radius: 6px; padding: 20px 24px; background: var(--surface); animation: fadeUp 0.4s ease both; }
    .stat-card:nth-child(2){animation-delay:0.05s} .stat-card:nth-child(3){animation-delay:0.1s}
    .stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; font-family: 'DM Mono', monospace; margin-bottom: 8px; }
    .stat-value { font-size: 28px; font-weight: 500; letter-spacing: -0.03em; }
    .section { margin-bottom: 40px; animation: fadeUp 0.4s ease 0.15s both; }
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .section-title { font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); font-family: 'DM Mono', monospace; }
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 4px; font-size: 12px; font-family: 'DM Mono', monospace; cursor: pointer; border: 1px solid var(--border-light); transition: all 0.15s; background: transparent; color: var(--text); }
    .btn:hover { background: var(--border); }
    .btn-primary { background: var(--text); color: var(--bg); border-color: var(--text); }
    .btn-primary:hover { background: #d0d0d0; }
    .btn-danger { color: var(--danger); border-color: #331111; }
    .btn-danger:hover { background: #1a0808; }
    .btn-sm { padding: 4px 10px; font-size: 11px; }
    .table-wrap { border: 1px solid var(--border); border-radius: 6px; overflow: hidden; background: var(--surface); }
    table { width: 100%; border-collapse: collapse; }
    thead { background: var(--bg); }
    th { padding: 10px 16px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); font-family: 'DM Mono', monospace; font-weight: 400; border-bottom: 1px solid var(--border); }
    td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid var(--border); vertical-align: middle; }
    tr:last-child td { border-bottom: none; }
    tr { transition: background 0.1s; }
    tr:hover td { background: #161616; }
    .tag { display: inline-block; padding: 2px 8px; border-radius: 3px; font-size: 10px; font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.06em; }
    .tag-admin { background: #ffffff15; color: var(--text); border: 1px solid #ffffff25; }
    .tag-usuario { background: #ffffff08; color: var(--muted); border: 1px solid var(--border); }
    .tag-cat { background: #ffffff08; color: var(--muted); border: 1px solid var(--border); }
    .price { font-family: 'DM Mono', monospace; font-size: 13px; }
    .actions { display: flex; gap: 6px; }
    .empty { text-align: center; padding: 40px; color: var(--muted); font-size: 13px; font-family: 'DM Mono', monospace; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.2s; }
    .modal-overlay.open { opacity: 1; pointer-events: all; }
    .modal { background: var(--surface); border: 1px solid var(--border-light); border-radius: 8px; width: 440px; padding: 32px; transform: translateY(12px); transition: transform 0.2s; }
    .modal-overlay.open .modal { transform: translateY(0); }
    .modal-title { font-size: 15px; font-weight: 500; margin-bottom: 24px; }
    .form-group { margin-bottom: 16px; }
    .form-label { display: block; font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
    .form-input { width: 100%; background: var(--bg); border: 1px solid var(--border-light); border-radius: 4px; padding: 9px 12px; font-size: 13px; color: var(--text); font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.15s; }
    .form-input:focus { border-color: var(--muted); }
    .modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 24px; }
    .toast { position: fixed; bottom: 24px; right: 24px; z-index: 200; background: var(--surface); border: 1px solid var(--border-light); border-radius: 6px; padding: 12px 18px; font-size: 13px; font-family: 'DM Mono', monospace; display: flex; align-items: center; gap: 10px; transform: translateY(8px); opacity: 0; pointer-events: none; transition: all 0.25s; }
    .toast.show { transform: translateY(0); opacity: 1; }
    .toast-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
    .toast-dot.ok { background: var(--success); }
    .toast-dot.err { background: var(--danger); }
    .loading { display: flex; align-items: center; gap: 10px; color: var(--muted); font-size: 13px; font-family: 'DM Mono', monospace; padding: 32px 16px; }
    .spinner { width: 14px; height: 14px; border: 1px solid var(--border-light); border-top-color: var(--muted); border-radius: 50%; animation: spin 0.7s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .view { display: none; }
    .view.active { display: block; }
  </style>
</head>
<body>
<div class="app">
  <header class="topbar">
    <div class="topbar-brand">mi-api-vercel <span>/ dashboard</span></div>
    <div class="topbar-status"><div class="dot"></div><span id="api-url">conectando...</span></div>
  </header>
  <nav class="sidebar">
    <div class="sidebar-section">
      <div class="sidebar-label">Tablas</div>
      <div class="nav-item active" onclick="switchView('usuarios', this)"><span class="nav-icon">◈</span> usuarios <span class="nav-badge" id="badge-usuarios">—</span></div>
      <div class="nav-item" onclick="switchView('productos', this)"><span class="nav-icon">◈</span> productos <span class="nav-badge" id="badge-productos">—</span></div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">API</div>
      <div class="nav-item" onclick="switchView('endpoints', this)"><span class="nav-icon">◇</span> endpoints</div>
    </div>
  </nav>
  <main class="main">
    <div class="view active" id="view-usuarios">
      <div class="page-header"><div class="page-title">Usuarios</div><div class="page-sub">GET /api/usuarios</div></div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-label">Total</div><div class="stat-value" id="u-total">—</div></div>
        <div class="stat-card"><div class="stat-label">Admins</div><div class="stat-value" id="u-admins">—</div></div>
        <div class="stat-card"><div class="stat-label">Usuarios</div><div class="stat-value" id="u-users">—</div></div>
      </div>
      <div class="section">
        <div class="section-header"><div class="section-title">Registros</div><button class="btn btn-primary" onclick="openModal('usuario')">+ Nuevo usuario</button></div>
        <div class="table-wrap"><table><thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th></th></tr></thead><tbody id="tbody-usuarios"><tr><td colspan="5"><div class="loading"><div class="spinner"></div>cargando...</div></td></tr></tbody></table></div>
      </div>
    </div>
    <div class="view" id="view-productos">
      <div class="page-header"><div class="page-title">Productos</div><div class="page-sub">GET /api/productos</div></div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-label">Total</div><div class="stat-value" id="p-total">—</div></div>
        <div class="stat-card"><div class="stat-label">Precio promedio</div><div class="stat-value" id="p-avg">—</div></div>
        <div class="stat-card"><div class="stat-label">Categorías</div><div class="stat-value" id="p-cats">—</div></div>
      </div>
      <div class="section">
        <div class="section-header"><div class="section-title">Registros</div><button class="btn btn-primary" onclick="openModal('producto')">+ Nuevo producto</button></div>
        <div class="table-wrap"><table><thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th><th></th></tr></thead><tbody id="tbody-productos"><tr><td colspan="5"><div class="loading"><div class="spinner"></div>cargando...</div></td></tr></tbody></table></div>
      </div>
    </div>
    <div class="view" id="view-endpoints">
      <div class="page-header"><div class="page-title">Endpoints</div><div class="page-sub">Referencia de la API</div></div>
      <div class="section"><div class="table-wrap"><table><thead><tr><th>Método</th><th>Ruta</th><th>Descripción</th></tr></thead><tbody id="endpoint-list"></tbody></table></div></div>
    </div>
  </main>
</div>

<div class="modal-overlay" id="modal-usuario">
  <div class="modal">
    <div class="modal-title" id="modal-usuario-title">Nuevo usuario</div>
    <input type="hidden" id="u-edit-id"/>
    <div class="form-group"><label class="form-label">Nombre</label><input class="form-input" id="u-nombre" placeholder="Ana García"/></div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="u-email" type="email" placeholder="ana@ejemplo.com"/></div>
    <div class="form-group"><label class="form-label">Rol</label><select class="form-input" id="u-rol"><option value="usuario">usuario</option><option value="admin">admin</option></select></div>
    <div class="modal-footer"><button class="btn" onclick="closeModal('usuario')">Cancelar</button><button class="btn btn-primary" onclick="saveUsuario()">Guardar</button></div>
  </div>
</div>

<div class="modal-overlay" id="modal-producto">
  <div class="modal">
    <div class="modal-title" id="modal-producto-title">Nuevo producto</div>
    <input type="hidden" id="p-edit-id"/>
    <div class="form-group"><label class="form-label">Nombre</label><input class="form-input" id="p-nombre" placeholder="Laptop Pro"/></div>
    <div class="form-group"><label class="form-label">Precio</label><input class="form-input" id="p-precio" type="number" placeholder="25000"/></div>
    <div class="form-group"><label class="form-label">Categoría</label><input class="form-input" id="p-categoria" placeholder="Electrónica"/></div>
    <div class="modal-footer"><button class="btn" onclick="closeModal('producto')">Cancelar</button><button class="btn btn-primary" onclick="saveProducto()">Guardar</button></div>
  </div>
</div>

<div class="toast" id="toast"><div class="toast-dot ok" id="toast-dot"></div><span id="toast-msg"></span></div>

<script>
  const BASE = window.location.origin;

  function switchView(name, el) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('view-' + name).classList.add('active');
    el.classList.add('active');
    if (name === 'usuarios') loadUsuarios();
    if (name === 'productos') loadProductos();
    if (name === 'endpoints') renderEndpoints();
  }

  function toast(msg, ok = true) {
    const el = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    document.getElementById('toast-dot').className = 'toast-dot ' + (ok ? 'ok' : 'err');
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2800);
  }

  function openModal(type, data = null) {
    if (type === 'usuario') {
      document.getElementById('modal-usuario-title').textContent = data ? 'Editar usuario' : 'Nuevo usuario';
      document.getElementById('u-edit-id').value = data?.id || '';
      document.getElementById('u-nombre').value = data?.nombre || '';
      document.getElementById('u-email').value = data?.email || '';
      document.getElementById('u-rol').value = data?.rol || 'usuario';
    } else {
      document.getElementById('modal-producto-title').textContent = data ? 'Editar producto' : 'Nuevo producto';
      document.getElementById('p-edit-id').value = data?.id || '';
      document.getElementById('p-nombre').value = data?.nombre || '';
      document.getElementById('p-precio').value = data?.precio || '';
      document.getElementById('p-categoria').value = data?.categoria || '';
    }
    document.getElementById('modal-' + type).classList.add('open');
  }

  function closeModal(type) { document.getElementById('modal-' + type).classList.remove('open'); }

  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
  });

  // USUARIOS
  async function loadUsuarios() {
    const tbody = document.getElementById('tbody-usuarios');
    tbody.innerHTML = '<tr><td colspan="5"><div class="loading"><div class="spinner"></div>cargando...</div></td></tr>';
    try {
      const r = await fetch(BASE + '/api/usuarios');
      const data = await r.json();
      document.getElementById('u-total').textContent = data.length;
      document.getElementById('u-admins').textContent = data.filter(u => u.rol === 'admin').length;
      document.getElementById('u-users').textContent = data.filter(u => u.rol === 'usuario').length;
      document.getElementById('badge-usuarios').textContent = data.length;
      if (!data.length) { tbody.innerHTML = '<tr><td colspan="5"><div class="empty">Sin registros</div></td></tr>'; return; }
      tbody.innerHTML = data.map(u => \`
        <tr>
          <td style="color:var(--muted);font-family:'DM Mono',monospace;font-size:11px">\${u.id}</td>
          <td>\${u.nombre}</td>
          <td style="color:var(--muted);font-family:'DM Mono',monospace;font-size:12px">\${u.email}</td>
          <td><span class="tag tag-\${u.rol}">\${u.rol}</span></td>
          <td><div class="actions">
            <button class="btn btn-sm" onclick='openModal("usuario", \${JSON.stringify(u)})'>editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteUsuario(\${u.id})">eliminar</button>
          </div></td>
        </tr>\`).join('');
    } catch { tbody.innerHTML = '<tr><td colspan="5"><div class="empty">Error al cargar</div></td></tr>'; }
  }

  async function saveUsuario() {
    const id = document.getElementById('u-edit-id').value;
    const body = { nombre: document.getElementById('u-nombre').value, email: document.getElementById('u-email').value, rol: document.getElementById('u-rol').value };
    if (!body.nombre || !body.email) { toast('Completa todos los campos', false); return; }
    try {
      const r = await fetch(id ? \`\${BASE}/api/usuarios?id=\${id}\` : \`\${BASE}/api/usuarios\`, { method: id ? 'PUT' : 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
      if (!r.ok) throw new Error();
      closeModal('usuario'); toast(id ? 'Usuario actualizado' : 'Usuario creado'); loadUsuarios();
    } catch { toast('Error al guardar', false); }
  }

  async function deleteUsuario(id) {
    if (!confirm('¿Eliminar este usuario?')) return;
    try {
      const r = await fetch(\`\${BASE}/api/usuarios?id=\${id}\`, { method: 'DELETE' });
      if (!r.ok) throw new Error();
      toast('Usuario eliminado'); loadUsuarios();
    } catch { toast('Error al eliminar', false); }
  }

  // PRODUCTOS
  async function loadProductos() {
    const tbody = document.getElementById('tbody-productos');
    tbody.innerHTML = '<tr><td colspan="5"><div class="loading"><div class="spinner"></div>cargando...</div></td></tr>';
    try {
      const r = await fetch(BASE + '/api/productos');
      const data = await r.json();
      const avg = data.length ? Math.round(data.reduce((s,p) => s + Number(p.precio), 0) / data.length) : 0;
      document.getElementById('p-total').textContent = data.length;
      document.getElementById('p-avg').textContent = avg ? '$' + avg.toLocaleString() : '—';
      document.getElementById('p-cats').textContent = new Set(data.map(p => p.categoria)).size;
      document.getElementById('badge-productos').textContent = data.length;
      if (!data.length) { tbody.innerHTML = '<tr><td colspan="5"><div class="empty">Sin registros</div></td></tr>'; return; }
      tbody.innerHTML = data.map(p => \`
        <tr>
          <td style="color:var(--muted);font-family:'DM Mono',monospace;font-size:11px">\${p.id}</td>
          <td>\${p.nombre}</td>
          <td><span class="price">$\${Number(p.precio).toLocaleString()}</span></td>
          <td><span class="tag tag-cat">\${p.categoria}</span></td>
          <td><div class="actions">
            <button class="btn btn-sm" onclick='openModal("producto", \${JSON.stringify(p)})'>editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProducto(\${p.id})">eliminar</button>
          </div></td>
        </tr>\`).join('');
    } catch { tbody.innerHTML = '<tr><td colspan="5"><div class="empty">Error al cargar</div></td></tr>'; }
  }

  async function saveProducto() {
    const id = document.getElementById('p-edit-id').value;
    const body = { nombre: document.getElementById('p-nombre').value, precio: parseFloat(document.getElementById('p-precio').value), categoria: document.getElementById('p-categoria').value };
    if (!body.nombre || !body.precio || !body.categoria) { toast('Completa todos los campos', false); return; }
    try {
      const r = await fetch(id ? \`\${BASE}/api/productos?id=\${id}\` : \`\${BASE}/api/productos\`, { method: id ? 'PUT' : 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
      if (!r.ok) throw new Error();
      closeModal('producto'); toast(id ? 'Producto actualizado' : 'Producto creado'); loadProductos();
    } catch { toast('Error al guardar', false); }
  }

  async function deleteProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
      const r = await fetch(\`\${BASE}/api/productos?id=\${id}\`, { method: 'DELETE' });
      if (!r.ok) throw new Error();
      toast('Producto eliminado'); loadProductos();
    } catch { toast('Error al eliminar', false); }
  }

  // ENDPOINTS
  function renderEndpoints() {
    const eps = [
      ['GET','#44ff88','/api/usuarios','Lista todos los usuarios'],
      ['GET','#44ff88','/api/usuarios?id=1','Obtiene usuario por ID'],
      ['POST','#ffaa00','/api/usuarios','Crea un nuevo usuario'],
      ['PUT','#4488ff','/api/usuarios?id=1','Actualiza un usuario'],
      ['DELETE','#ff4444','/api/usuarios?id=1','Elimina un usuario'],
      ['GET','#44ff88','/api/productos','Lista todos los productos'],
      ['GET','#44ff88','/api/productos?categoria=X','Filtra por categoría'],
      ['POST','#ffaa00','/api/productos','Crea un nuevo producto'],
      ['PUT','#4488ff','/api/productos?id=1','Actualiza un producto'],
      ['DELETE','#ff4444','/api/productos?id=1','Elimina un producto'],
    ];
    document.getElementById('endpoint-list').innerHTML = eps.map(([m,c,r,d]) =>
      \`<tr><td><span style="font-family:'DM Mono',monospace;font-size:11px;color:\${c}">\${m}</span></td><td><span style="font-family:'DM Mono',monospace;font-size:12px">\${r}</span></td><td style="color:var(--muted);font-size:13px">\${d}</td></tr>\`
    ).join('');
  }

  document.getElementById('api-url').textContent = window.location.hostname;
  loadUsuarios();
</script>
</body>
</html>`;
}
