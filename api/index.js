const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/search', async (req, res) => {
    const queryParam = req.query.query;

    if (!queryParam) {
        return res.status(400).json({ error: "Query parameter required" });
    }

    try {
        const response = await fetch('https://paksim.xyz/psg-search.php', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'content-type': 'application/x-www-form-urlencoded',
                'origin': 'https://paksim.xyz',
                'referer': 'https://paksim.xyz/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest'
            },
            body: new URLSearchParams({
                'q': queryParam
            })
        });

        const data = await response.text();
        return res.status(200).json({ status: "success", data: data });

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
});

module.exports = app;
