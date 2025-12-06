# 🔴 SOLUCIÓN AL ERROR 500 EN PRODUCCIÓN

## Problema Identificado
Tu aplicación funciona en localhost pero falla en https://expon.me porque:
- **DATABASE_URL** apunta a `127.0.0.1:5433` (tu máquina local)
- En producción (Dokploy), necesitas la URL de la base de datos de Dokploy

---

## ✅ SOLUCIÓN PASO A PASO

### 1. Obtener la URL correcta de Dokploy

Ve a tu panel de Dokploy:
1. Abre tu proyecto **exponme**
2. Ve a la sección **Database** o **PostgreSQL**
3. Busca **Connection String** o **Database URL**
4. Debe verse algo como:
   ```
   postgresql://usuario:password@postgres:5432/exponme_db
   ```
   O:
   ```
   postgresql://usuario:password@db.dokploy.com:5432/exponme_db
   ```

### 2. Configurar en Dokploy

1. En tu proyecto de Dokploy, ve a **Settings** → **Environment Variables**
2. Agrega o edita la variable:
   ```
   Nombre: DATABASE_URL
   Valor: <la connection string que obtuviste en el paso 1>
   ```
3. **IMPORTANTE**: No uses `127.0.0.1` ni `localhost`

### 3. Redeploy

1. Guarda los cambios
2. Haz un **redeploy** de tu aplicación
3. Espera a que termine el deployment

---

## 🔍 Verificación

Después del redeploy:
1. Abre https://expon.me
2. Revisa la consola del navegador (F12)
3. Ya NO debe aparecer el error 500
4. Los datos deben cargarse correctamente

---

## 📝 Archivos Actualizados

He mejorado tu configuración local:

### `.env.example`
- Ahora tiene instrucciones claras para producción
- Explica cómo configurar en Dokploy

### `src/lib/db.ts`
- Ahora valida que DATABASE_URL exista
- Muestra error claro si falta la variable
- Log de conexión en desarrollo

### `database_changes.sql`
- Nuevo archivo para trackear cambios en la BD
- Guarda aquí cualquier ALTER TABLE o cambio futuro

---

## ❓ Si aún tienes problemas

Envíame:
1. Captura de las **Environment Variables** en Dokploy
2. El valor de **DATABASE_URL** que estás usando (borra la contraseña antes de enviarlo)
3. Logs del deployment en Dokploy
