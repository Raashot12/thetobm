import withPWA from 'next-pwa';

module.exports = {
  swcMinify: false,
}
const withPWAConfig = withPWA( {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
} );

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'preview.colorlib.com', 'th.bing.com', "backend-asset-storage.s3.us-east-1.amazonaws.com", "istockphoto.com"],
  },
};

export default withPWAConfig( {
  ...nextConfig,
  webpack: ( cfg ) => {
    cfg.module.rules.push( {
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] },
    } );
    return cfg;
  },
} );