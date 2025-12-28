// app/api/spotify-auth.ts

interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export async function getSpotifyAccessToken(): Promise<string> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('Missing Spotify credentials');
    }

    const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    if (!res.ok) {
        throw new Error('Failed to get Spotify access token');
    }

    const data = (await res.json()) as SpotifyTokenResponse;
    return data.access_token;
}
