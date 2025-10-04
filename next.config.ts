/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hehslaqtdjjdnnemydcq.supabase.co', // Your exact Supabase hostname
        pathname: '/storage/v1/object/public/**', // Optional: Limits to public Storage paths
      },
    ],
  },
};

module.exports = nextConfig;