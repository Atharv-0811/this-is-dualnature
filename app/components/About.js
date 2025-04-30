export default function About() {
    return (
        <div className="bg-gray-800 text-white py-16 min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">About Dualnature</h2>
                <p className="text-lg mb-8">
                    Dualnature is a music duo that blends genres and explores creative boundaries. With a passion for blending diverse styles, they bring a unique sound to the music scene, fusing elements from various genres and drawing inspiration from their multi-instrumental backgrounds.
                </p>
                <img 
                    src="/path-to-your-image.jpg" 
                    alt="Dualnature" 
                    className="mx-auto mb-8 rounded-lg"
                    style={{ maxWidth: '400px', height: 'auto' }}
                />
                <p className="text-lg">Connect with us and explore our music journey!</p>
            </div>
        </div>
    );
}
