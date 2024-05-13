const express = require('express');
const osmtogeojson = require('osmtogeojson');

const app = express();

app.use(express.json({limit: process.env.BODYLIMIT || '50mb'}));

app.post('/convert', (req, res) => {
    const data = req.body;
    try {
        // Convert OSM data to GeoJSON
        const geoJson = osmtogeojson(data);
        res.json(geoJson);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while converting OSM to GeoJSON'});
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));