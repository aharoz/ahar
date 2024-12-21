import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ahmet Arif Portfolio API',
      version: '1.0.0',
      description: 'API documentation for Ahmet Arif Portfolio website',
      contact: {
        name: 'Ahmet Arif',
        email: 'contact@ahmetarif.com.tr',
        url: 'https://ahmetarif.com.tr',
      },
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
        description: 'API Server',
      },
    ],
  },
  apis: ['./app/api/**/*.ts'], // API route dosyalarının yolu
};

const swaggerSpec = swaggerJsdoc(options);

export async function GET() {
  return NextResponse.json(swaggerSpec);
} 