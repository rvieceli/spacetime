const fs = require('node:fs');
const path = require('node:path');
const S3rver = require('s3rver');

new S3rver({
  port: 4004,
  address: '0.0.0.0',
  directory: './s3-local/buckets',
  configureBuckets: [
    {
      name: 'media',
      configs: [fs.readFileSync(path.join(__dirname, './cors.xml'))],
    },
  ],
}).run();
