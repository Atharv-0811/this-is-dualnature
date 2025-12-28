// /app/api/spotify/top-tracks/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    // Check for missing credentials
    if (!client_id || !client_secret) {
        return new NextResponse('Missing Spotify credentials', { status: 400 });
    }

    const authBuffer = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${authBuffer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    if (!res.ok) {
        return new NextResponse('Error fetching token from Spotify', { status: 500 });
    }

    const data = await res.json();
    const token = data.access_token;

    if (!token) {
        return new NextResponse('No token received from Spotify', { status: 500 });
    }

    // Now, fetch the top tracks
    // Note: Artist ID '3TVXtAsR1Inumwj472S9r4' is hardcoded here, which matches the other file's logic for Dualnature?
    // Wait, the other file was searching for 'Dualnature'. This one seems to be a hardcoded endpoint.
    const tracksRes = await fetch("https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4/top-tracks?market=US", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!tracksRes.ok) {
        return new NextResponse('Error fetching top tracks from Spotify', { status: 500 });
    }

    const tracksData = await tracksRes.json();

    return NextResponse.json(tracksData);
}
