const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: [
      "https://slugshop.online",
      // "http://localhost:5173"
    ],
    credentials: true, // optional (if using cookies/auth)
  })
);
app.use(express.json());
app.use('/api/products', require('./routes/products'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('D3D DROPS Server is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
