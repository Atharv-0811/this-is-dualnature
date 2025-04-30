// /app/api/spotify/route.js
export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  // Check for missing credentials
  if (!client_id || !client_secret) {
    return new Response('Missing Spotify credentials', { status: 400 });
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
    return new Response('Error fetching token from Spotify', { status: 500 });
  }

  const data = await res.json();
  const token = data.access_token;

  if (!token) {
    return new Response('No token received from Spotify', { status: 500 });
  }

  // Now, fetch the top tracks
  const tracksRes = await fetch("https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4/top-tracks?market=US", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!tracksRes.ok) {
    return new Response('Error fetching top tracks from Spotify', { status: 500 });
  }

  const tracksData = await tracksRes.json();

  return Response.json(tracksData);
}
