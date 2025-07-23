import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, WineType } from '../../../../generated/prisma';

const prisma = new PrismaClient();

// Simple admin authentication (in production, use proper auth)
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (!authHeader) return false;
  
  const token = authHeader.replace('Bearer ', '');
  return token === adminPassword;
}

// GET - Get all wines for admin (same as public API but with auth)
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const wines = await prisma.wine.findMany({
      orderBy: { createdAt: 'desc' }
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

// POST - Create new wine
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, winery, price, image, type, description } = body;

    // Validate required fields
    if (!name || !winery || !price || !image || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: name, winery, price, image, type' },
        { status: 400 }
      );
    }

    // Validate wine type
    if (type !== 'RED' && type !== 'WHITE') {
      return NextResponse.json(
        { error: 'Wine type must be RED or WHITE' },
        { status: 400 }
      );
    }

    // Validate price is a positive number
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }

    const wine = await prisma.wine.create({
      data: {
        name: name.trim(),
        winery: winery.trim(),
        price: parseFloat(price),
        image: image.trim(),
        type: type as WineType,
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(wine, { status: 201 });
  } catch (error) {
    console.error('Error creating wine:', error);
    return NextResponse.json(
      { error: 'Failed to create wine' },
      { status: 500 }
    );
  }
} 