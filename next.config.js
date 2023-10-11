/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,

    domains: [
      'dspncdn.com',
      's-media-cache-ak0.pinimg.com',
      '68.media.tumblr.com',
      's.yimg.com',
      's3.burpple.com',
      'images.placeholders.dev',
    ],
  },
};

module.exports = nextConfig;
