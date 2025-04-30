// components/Gallery.js
'use client';

export default function Gallery() {
  const images = [
    'https://picsum.photos/seed/music1/400/300',
    'https://picsum.photos/seed/music2/400/300',
    'https://picsum.photos/seed/music3/400/300',
    'https://picsum.photos/seed/music4/400/300',
    'https://picsum.photos/seed/music5/400/300',
    'https://picsum.photos/seed/music6/400/300',
  ];

  return (
    <section className="bg-darkgray text-white py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
