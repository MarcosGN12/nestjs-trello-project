import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.colors.createMany({
        data: [
            { name: 'Rojo', value: '#FF0000' },
            { name: 'Verde', value: '#00FF00' },
            { name: 'Azul', value: '#0000FF' },
            { name: 'Amarillo', value: '#FFFF00' },
            { name: 'Morado', value: '#800080' },
        ],
        skipDuplicates: true,
    })

    const allColors = await prisma.colors.findMany()

    await prisma.categories.createMany({
        data: [
            { name: 'Urgente', colorId: allColors[0].id },
            { name: 'Trabajo', colorId: allColors[1].id },
            { name: 'Personal', colorId: allColors[2].id },
            { name: 'Estudios', colorId: allColors[3].id },
            { name: 'Otros', colorId: allColors[4].id },
        ],
        skipDuplicates: true,
    })

    console.log('✅ Colores y categorías creadas exitosamente.')
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })