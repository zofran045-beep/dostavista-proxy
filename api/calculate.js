export default async function handler(req, res) {
    // Включаем CORS заголовки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-DV-Auth-Token');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { body, headers } = req;
        
        console.log('Proxy received request to calculate-order');
        
        const response = await fetch('https://apitest.dostavista.ru/api/business/1.1/calculate-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-DV-Auth-Token': headers['x-dv-auth-token'] || process.env.DOSTAVISTA_API_KEY
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(30000) // 30 секунд таймаут
        });

        const data = await response.json();
        console.log('Proxy received response from Dostavista');
        
        return res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ 
            error: 'Proxy error',
            message: error.message,
            timeout: error.name === 'TimeoutError'
        });
    }
}
