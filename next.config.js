// module.exports = {
//   // ... other Next.js config options ...
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(xlsx|xlsb|xls|m|xlw|ods)$/,
//       use: 'xlsx-loader',
//     });
//     return config;
//   },
// };

const withImages = require('next-images');

module.exports = withImages({
  fileExtensions: ['xlsx']
});