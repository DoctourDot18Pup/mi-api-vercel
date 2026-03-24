# mi-api-vercel

API REST serverless desplegada en Vercel con base de datos PostgreSQL en Supabase. Incluye dashboard web con CRUD completo para gestión de usuarios y productos.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Deploy | Vercel (Serverless Functions) |
| Runtime | Node.js 18+ (ES Modules) |
| Base de datos | Supabase (PostgreSQL) |
| Frontend | HTML/CSS/JS vanilla (incrustado en handler) |

---

## Estructura del proyecto

```
mi-api-vercel/
├── api/
│   ├── _supabase.js     ← cliente de Supabase (compartido)
│   ├── index.js         ← sirve el dashboard web
│   ├── usuarios.js      ← CRUD de usuarios
│   └── productos.js     ← CRUD de productos
├── package.json
├── vercel.json
└── README.md
```

---

## Endpoints

### Usuarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/usuarios` | Lista todos los usuarios |
| `GET` | `/api/usuarios?id=1` | Obtiene un usuario por ID |
| `POST` | `/api/usuarios` | Crea un nuevo usuario |
| `PUT` | `/api/usuarios?id=1` | Actualiza un usuario |
| `DELETE` | `/api/usuarios?id=1` | Elimina un usuario |

### Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/productos` | Lista todos los productos |
| `GET` | `/api/productos?categoria=Electrónica` | Filtra productos por categoría |
| `GET` | `/api/productos?id=1` | Obtiene un producto por ID |
| `POST` | `/api/productos` | Crea un nuevo producto |
| `PUT` | `/api/productos?id=1` | Actualiza un producto |
| `DELETE` | `/api/productos?id=1` | Elimina un producto |

---

## Ejemplos de uso

### Crear un usuario
```bash
curl -X POST https://tu-proyecto.vercel.app/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Ana García", "email": "ana@ejemplo.com", "rol": "admin"}'
```

### Actualizar un producto
```bash
curl -X PUT https://tu-proyecto.vercel.app/api/productos?id=1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Laptop Ultra", "precio": 30000, "categoria": "Electrónica"}'
```

### Eliminar un usuario
```bash
curl -X DELETE https://tu-proyecto.vercel.app/api/usuarios?id=2
```

---

## Base de datos

### Tabla `usuarios`

```sql
CREATE TABLE usuarios (
  id     SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email  VARCHAR(100) UNIQUE NOT NULL,
  rol    VARCHAR(20) DEFAULT 'usuario'
);
```

### Tabla `productos`

```sql
CREATE TABLE productos (
  id        SERIAL PRIMARY KEY,
  nombre    VARCHAR(100) NOT NULL,
  precio    NUMERIC(10,2) NOT NULL,
  categoria VARCHAR(50) NOT NULL
);
```

---

## Variables de entorno

Configura estas variables en **Vercel → Settings → Environment Variables**:

| Variable | Descripción |
|----------|-------------|
| `SUPABASE_URL` | URL del proyecto en Supabase |
| `SUPABASE_KEY` | Clave `anon public` de Supabase |

Para desarrollo local crea un archivo `.env`:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-anon-key
```

> Nunca subir `.env` al repositorio. Agregar a `.gitignore`.

---

## Instalación y despliegue local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/mi-api-vercel.git
cd mi-api-vercel

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env con tus credenciales de Supabase

# 4. Levantar servidor local
npm run dev
```

## Despliegue en Vercel

### Opción A — Desde GitHub (recomendado)

1. Sube el proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) → **Add New Project**
3. Importa el repositorio
4. Configura las variables de entorno
5. Haz clic en **Deploy**

A partir de ese momento, cada `git push` a `main` genera un redespliegue automático.

### Opción B — Desde CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Dashboard

Al acceder a la raíz del proyecto (`/`) se carga un dashboard web con:

- Vista de tabla para **usuarios** y **productos**
- Estadísticas en tiempo real (totales, promedios, categorías)
- Formularios para **crear** y **editar** registros
- Botón de **eliminar** con confirmación
- Referencia de todos los endpoints disponibles
- Notificaciones de éxito/error en cada operación

---

## Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
