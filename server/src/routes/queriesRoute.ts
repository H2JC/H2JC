import express, { Request, Response } from 'express';
import Queries from '../models/queriesModel';


const router = express.Router();


router.post('/', async (req: Request, res: Response) => {
    const { queries } = req.body;
  
    try {
      const newQuery = new Queries ({ queries });
      const savedQuery = await newQuery.save();
  
      res.status(201).json(savedQuery);
    } catch (error) { 
      res.status(500).json(error); 
  }
  });
  

export default router;