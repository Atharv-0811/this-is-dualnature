import { getSpotifyAccessToken } from '../spotify-auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const query = searchParams.get('q');

  try {
    const token = await getSpotifyAccessToken();

    // If it's an artist search
    if (type === 'artist') {
      const searchRes = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!searchRes.ok) {
        throw new Error('Failed to search artist');
      }

      const searchData = await searchRes.json();
      const artistId = searchData.artists.items[0]?.id;

      if (!artistId) {
        return new Response('Artist not found', { status: 404 });
      }

      // Get artist's top tracks
      const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!tracksRes.ok) {
        throw new Error('Failed to fetch top tracks');
      }

      const tracksData = await tracksRes.json();
      return Response.json(tracksData);
    }

    return new Response('Invalid request type', { status: 400 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal server error', { status: 500 });
  }
} 