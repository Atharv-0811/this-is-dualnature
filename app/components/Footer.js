import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="mb-4 text-lg">© 2025 Dualnature. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/profile.php?id=61574809349471"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral transition"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.instagram.com/thisisdualnature"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral transition"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://x.com/_dualnature_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral transition"
          >
            <FaTwitter size={30} />
          </a>
        </div>
        <p className="text-sm text-gray-400 py-4 pt-8">
          Developed by{' '}
          <a
            href="https://github.com/Atharv-0811"
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral hover:underline"
          >
            Atharv Chinchkar
          </a>
        </p>
      </div>
    </footer>
  );
}
