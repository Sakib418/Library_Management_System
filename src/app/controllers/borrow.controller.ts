import express, { Request, Response } from 'express';
import { Book } from "../models/book.models";
import { Borrow } from "../models/borrow.models";



export const borrowRoutes = express.Router();










// borrowRoutes.post('/', async (req: Request, res: Response)=> {
//      try {
//        const { book, quantity, dueDate } = req.body;
       
//        if (!book || !quantity || !dueDate) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields'
//       });
//     }

//     const foundBook = await Book.findById(book);
//     if (!foundBook) {
//       return res.status(404).json({
//         success: false,
//         message: 'Book not found'
//       });
//     }
    

//     if (foundBook.copies < quantity) {
//       return res.status(400).json({
//         success: false,
//         message: `Only ${foundBook.copies} copies available`
//       });
//     }


//     foundBook.copies -= quantity;
//     foundBook.updateAvailability(); 
//     await foundBook.save();

//      const borrowRecord = await Borrow.create({
//       book,
//       quantity,
//       dueDate
//     });
    
//     res.status(201).json({
//       success: true,
//       message: 'Book borrowed successfully',
//       data: borrowRecord
//     });
           
          
//      }catch (error){
//         res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error
//     })
// }      
// });


borrowRoutes.post('/', async (req: Request, res: Response) => {
     try {
      const { book, quantity, dueDate } = req.body;
       
      
      if (!book || !quantity || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const foundBook = await Book.findById(book);

    if (!foundBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    

    if (foundBook.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${foundBook.copies} copies available`
      });
    }


    foundBook.copies -= quantity;

    foundBook.updateAvailability(); 
    await foundBook.save();

     const borrowRecord = await Borrow.create({
      book,
      quantity,
      dueDate
    });
    
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrowRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Book can not be borrowed',
      error
    });
  }
})

borrowRoutes.get('/', async (req: Request, res: Response)=> {
     try {
         const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books', 
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo'
        }
      },
      {
        $unwind: '$bookInfo'
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn'
          },
          totalQuantity: 1,
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: 'Book borrowed successfully',
      data: summary
    });
     } catch (error) {
         res.status(404).json({
      success: false,
      message: 'Failed to retrieve summary',
      error
    });
     }
})