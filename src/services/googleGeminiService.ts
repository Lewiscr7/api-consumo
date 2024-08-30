import * as https from 'https';

export function analyzeImage(imageBase64: string): Promise<any> {
return new Promise((resolve, reject) => {
    const data = JSON.stringify({ image: imageBase64 });

    const options = {
        hostname: 'api.example.com', // Substitua pelo hostname real
        path: '/gemini', // Substitua pelo caminho real
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
    };

    const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        try {
        const parsedData = JSON.parse(responseData);
        resolve(parsedData);
        } catch (error) {
            reject(new Error('Failed to parse response'));
        }
    });
    });

    req.on('error', (error) => {
    reject(new Error('Request failed'));
    });

    req.write(data);
    req.end();
});
}
