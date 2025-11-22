import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Povolit CORS (pro komunikaci s frontendem)
app.use(cors());
app.use(express.json());

// Testovací endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Backend běží!' });
});

// Spustit server
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
