import * as xlsx from 'xlsx'
import withPlugins from 'next-compose-plugins';
const withImages = require('next-images');

const path = require('path');
const getConfig = require('next/config');
// console.log("start of cjs");



const nextConfig = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  publicRuntimeConfig: {
    // Define any client-side configuration variables here
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(xlsx|xlsb|xls|m|xlw|ods)$/,
      use: 'xlsx-loader',
    });

    
    return config;
  },
};
export function serverPath  (staticFilePath)  {
  
  const serverRuntimeConfig = getConfig().serverRuntimeConfig;
  const PROJECT_ROOT = serverRuntimeConfig ? serverRuntimeConfig.PROJECT_ROOT : process.cwd();
  // console.log("this is from next.config "+JSON.stringify(serverRuntimeConfig)+JSON.stringify(PROJECT_ROOT) + staticFilePath+JSON.stringify(process.cwd()));
  return path.join(process.cwd(), staticFilePath)
}
module.exports = withPlugins([
  withImages(),
], nextConfig);

module.exports.serverPath = serverPath;