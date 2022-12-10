/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  images: {
    domains: [
      // For login background image
      'images.unsplash.com',
      // temporary dummy avatar
      'avatars.dicebear.com',
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login/employee',
        permanent: true,
      },
    ];
  },
};
