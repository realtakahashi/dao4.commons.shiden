/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    MASTERDAO_CONTRACT_ADDRESS: process.env.MASTERDAO_CONTRACT_ADDRESS
  }
}