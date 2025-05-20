import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.colors.createMany({
        data: [
            { name: 'Red', value: '#FF0000' },
            { name: 'Green', value: '#00FF00' },
            { name: 'Blue', value: '#0000FF' },
            { name: 'Yellow', value: '#FFFF00' },
            { name: 'Purple', value: '#800080' },
            { name: 'Brown', value: '#A52A2A' },
            { name: 'Pink', value: '#FFC0CB' },
            { name: 'Black', value: '#000000' },
        ],
        skipDuplicates: true,
    })

    const allColors = await prisma.colors.findMany()

    await prisma.categories.createMany({
        data: [
            { name: 'Urgent', colorId: allColors[0].id },
            { name: 'Job', colorId: allColors[1].id },
            { name: 'Personal', colorId: allColors[2].id },
            { name: 'Studies', colorId: allColors[3].id },
            { name: 'Health', colorId: allColors[4].id },
            { name: 'Travel', colorId: allColors[5].id },
            { name: 'Family', colorId: allColors[6].id },
            { name: 'Others', colorId: allColors[7].id },
        ],
        skipDuplicates: true,
    })
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })