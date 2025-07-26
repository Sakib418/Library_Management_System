import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';
import cors from 'cors';


const app: Application = express();

// app.use(cors({
//   origin: ['https://library-management-frontend-seven-mu.vercel.app'], // frontend URL
//   credentials: true,
// }));

app.use(cors({
  origin: "https://library-management-frontend-seven-mu.vercel.app/",
  credentials: true,
}));

app.use(express.json())


app.use("/api/books",bookRoutes);

app.use("/api/borrow",borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Lib API');
});



export default app;

