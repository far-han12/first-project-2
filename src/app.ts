import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();
// const port = 5000

// parsers
app.use(express.json());
app.use(cors());
// application routes
app.use("/api/v1/students",StudentRoutes)


const getAcontroller =(req: Request, res: Response) => {
  const a = 10;

  res.send(a);
}
app.get('/', getAcontroller);

export default app;
// console.log(process.cwd());
// D:\Programming-Hero\Level-2\Express\Module-4\first-project/.env
