/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS
  },
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //       test: /\.(js|mjs|jsx|ts|tsx)$/,
  //       loader: 'ts-loader',
  //       // use: [
  //       //   'ts-loader',
  //       // ],
  //       exclude: '/node_modules/',
  //       options: { allowTsInNodeModules: true, },
  //   });

  //  return config;
  // }
}
