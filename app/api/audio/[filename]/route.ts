import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    try {
        // Properly destructure and await the params
        const { filename } = await params;

        if (!filename) {
            return new NextResponse('Filename parameter is required', { status: 400 });
        }

        const filePath = path.resolve('./audio', filename);

        if (!fs.existsSync(filePath)) {
            return new NextResponse('File not found', { status: 404 });
        }

        const stat = fs.statSync(filePath);
        const range = request.headers.get('range');

        if (!range) {
            return new NextResponse('Requires Range header', { status: 416 });
        }

        const CHUNK_SIZE = 1 * 1e6; // 1MB
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE, stat.size - 1);

        // @ts-ignore - fs.createReadStream options match but TS definition might be strict about start/end
        const stream = fs.createReadStream(filePath, { start, end });

        return new NextResponse(stream as any, {
            status: 206,
            headers: {
                'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': String(end - start + 1),
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Audio API error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
