import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, WineType } from '../../../../../generated/prisma';

const prisma = new PrismaClient();

// Simple admin authentication (in production, use proper auth)
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (!authHeader) return false;
  
  const token = authHeader.replace('Bearer ', '');
  return token === adminPassword;
}

// PUT - Update wine
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
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

    const wine = await prisma.wine.update({
      where: { id },
      data: {
        name: name.trim(),
        winery: winery.trim(),
        price: parseFloat(price),
        image: image.trim(),
        type: type as WineType,
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(wine);
  } catch (error: any) {
    console.error('Error updating wine:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Wine not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update wine' },
      { status: 500 }
    );
  }
}

// DELETE - Delete wine
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    
    await prisma.wine.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Wine deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting wine:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Wine not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete wine' },
      { status: 500 }
    );
  }
} 