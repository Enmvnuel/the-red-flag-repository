import { PrismaClient } from '@prisma/client'

// PrismaClient es adjuntado al objeto `global` en desarrollo para prevenir
// instanciar demasiados clientes durante el hot-reload de Next.js
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Función helper para manejar conexiones
export async function connectDB() {
  try {
    await prisma.$connect()
    console.log('✅ Conectado a Amazon Aurora PostgreSQL')
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error)
    throw error
  }
}

// Función helper para desconectar
export async function disconnectDB() {
  await prisma.$disconnect()
}
