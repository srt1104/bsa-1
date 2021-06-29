const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
