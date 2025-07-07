import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook>(
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

export const Book = model("Book", bookSchema);