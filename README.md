# EscribanosARG 🇦🇷

Marketplace para conectar clientes con escribanos en Argentina.

## Stack
- Next.js 14.2.18
- React 18.2.0
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth.js

## Instalación

```bash
npm install
cp .env.example .env
# Editar .env con tus credenciales de Supabase
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Usuarios de prueba

| Rol | Email | Password |
|-----|-------|----------|
| Admin | admin@escribanosarg.com.ar | admin123 |
| Cliente | cliente@test.com | cliente123 |
| Escribano | maria@test.com | password123 |

## Scripts

- `npm run dev` - Desarrollo
- `npm run build` - Build
- `npm run db:push` - Sync DB
- `npm run db:seed` - Seed data
- `npm run db:studio` - Prisma Studio
