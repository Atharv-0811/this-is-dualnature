export default function LatestVideo() {
    return (
        <section id="latest-video" className="bg-black text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-4xl font-semibold">Latest Release</h2>
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full rounded-xl shadow-lg"
                        src="https://www.youtube.com/embed/xCkIqadBMOE"
                        title="Latest Song - Dualnature"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>
        </section>
    );
}
