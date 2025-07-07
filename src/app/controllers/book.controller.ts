import express, { Request, Response } from "express";
import { Book } from "../models/book.models";


export const bookRoutes = express.Router();

bookRoutes.post('/', async (req: Request, res: Response) => {

     try{
        const body = req.body;
           const data = await Book.create(body);
           
           res.status(200).json({
            success: true,
            message: "Book created successfully",
            data
            
           })
     }catch (error){
        res.status(500).json({
      success: false,
      message: 'Server error',
      error
    })
     }
           

           
           
});

bookRoutes.get('/', async (req: Request, res: Response) => {
    try{
const { filter,sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;

     const query: any = {};
    if (filter) {
      query.genre = filter;
    }

      const sortOption: any = {};
     sortOption[sortBy as string] = sort === 'desc' ? -1 : 1;


    
    const data = await Book.find(query)
      .sort(sortOption)
      .limit(parseInt(limit as string, 10));

    res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data
            
           })
    }catch (error){
        res.status(500).json({
      success: false,
      message: 'Books Can not be retrieved',
      error
    })
}
});

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try{
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);
    res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data
            
           })

    }catch (error){
        res.status(500).json({
      success: false,
      message: 'Books Can not be retrieved',
      error
    })
}


})

bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try{
    const bookId = req.params.bookId;
    const updatebody = req.body;
    const data = await Book.findByIdAndUpdate(bookId,updatebody,{new: true});
    res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data
           })

    }catch (error){
        res.status(500).json({
      success: false,
      message: 'Books Can not be updated',
      error
    })
}


})


bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try{
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data
            
           })

    }catch (error){
        res.status(500).json({
      success: false,
      message: 'Books Can not be deleted',
      error
    })
}


})