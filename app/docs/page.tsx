'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">API Dokümantasyonu</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <SwaggerUI url="/api/docs" />
      </div>
    </div>
  );
} 