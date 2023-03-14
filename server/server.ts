// sets up port
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, (): void => {
  console.log(`CHANGED server is listening on port ${PORT}`);
});
