/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed experimental scroll restoration as it might interfere with smooth scrolling
  images: {
    domains: ['i.scdn.co'],
  },
};

export default nextConfig;
