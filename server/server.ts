// sets up port
import fs from 'fs';
import app from './app';

// const PORT = process.env.PORT || 3003;
const SOCKETFILE = '/run/guest-services/backend.sock';

try {
  fs.unlinkSync(SOCKETFILE);
  console.log('Deleted the UNIX file.');
}
catch (err) {
  console.log('Did not need to delete the UNIX socket file.');
}

app.listen(SOCKETFILE, (): void => {
  console.log(`Listening on port ${SOCKETFILE}`);
});
