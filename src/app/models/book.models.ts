import { model, Schema } from "mongoose";
import { BookInterfaceMethod, IBook } from "../interfaces/book.interface";
import { Model } from "mongoose";


const bookSchema = new Schema<IBook, Model<IBook>, BookInterfaceMethod >(
    {
        title: { 
            type: String, 
            required: [true, 'Title is required'], 
            trim: true },
        author: { 
            type: String, 
            required: [true, 'Author is required'], 
            trim: true },
        genre: {
            type: String,
            required: [true, 'Genre is required'],
            enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            default: "FANTASY"
        },
        isbn: { 
            type: String, 
            unique: true, 
            required: true },
        description: { 
            type: String 
        },
        copies: {
            type: Number,
            required: [true, 'Number of copies is required'],
            min: [0, 'Copies must be a positive number'],
            validate: {
                validator: Number.isInteger,
                message: 'Copies must be an integer',
            },
        },
        available: {
            type: Boolean,
            default: true,
        }
    },{
        versionKey: false,
        timestamps: true,
    }

)

bookSchema.method("updateAvailability" , async function(){
  this.available = await this.copies > 0;
})
  

export const Book = model("Book", bookSchema);