import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
// const port = 5000

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
// console.log(process.cwd());
// D:\Programming-Hero\Level-2\Express\Module-4\first-project/.env
