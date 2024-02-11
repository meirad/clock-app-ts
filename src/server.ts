import express from 'express';
import path from 'path';
import Timezone from 'timezone-enum';

const app = express();
const PORT = 3003;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.get('/api/mytz', (req, res) => {
  const myTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  res.send(myTimezone);
} );


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get('/api/timezones', (req, res): any => {
  const allTimeZones = Object.values(Timezone);
  res.send(allTimeZones);
});