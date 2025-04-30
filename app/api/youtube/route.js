// app/api/youtube/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return new Response('Missing YouTube API key', { status: 500 });
  }

  if (!query) {
    return new Response('Missing search query', { status: 400 });
  }

  try {
    const searchQuery = `${query} official music video`;
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}&maxResults=1`
    );

    const data = await res.json();
    
    if (!res.ok) {
      console.error('YouTube API error:', data);
      return new Response(JSON.stringify({ error: 'Failed to fetch from YouTube API', details: data }), { 
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const videoId = data.items[0]?.id?.videoId;
    
    if (!videoId) {
      return new Response(JSON.stringify({ url: '#' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ url: `https://www.youtube.com/watch?v=${videoId}` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return new Response(JSON.stringify({ error: 'Error fetching YouTube data', details: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
  