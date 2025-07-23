import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const wine = await prisma.wine.findUnique({
      where: {
        id: id
      }
    });

    if (!wine) {
      return NextResponse.json(
        { error: 'Wine not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(wine);
  } catch (error) {
    console.error('Error fetching wine:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wine' },
      { status: 500 }
    );
  }
} 