// sets up port
import app from './app';
import cors from 'cors';

app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, (): void => {
  console.log(`Server is listening on port ${PORT}`);
});
