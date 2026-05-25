const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/scores',
  method: 'GET'
};

const startTime = Date.now();

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const sizeInBytes = Buffer.byteLength(data, 'utf8');
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    
    console.log(`Response time: ${duration}ms`);
    console.log(`Payload size: ${sizeInKB} KB (${sizeInBytes} bytes)`);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.end();
