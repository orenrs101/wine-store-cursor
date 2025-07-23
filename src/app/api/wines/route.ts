import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const wines = await prisma.wine.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(wines);
  } catch (error) {
    console.error('Error fetching wines:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wines' },
      { status: 500 }
    );
  }
} 