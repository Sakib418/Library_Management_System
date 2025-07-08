import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
//4ZY3ToBr5TbIp4JO
let server: Server;
const PORT = process.env.PORT || 5000;

async function main() {
    try{
       await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.aine5.mongodb.net/LibraryDB?retryWrites=true&w=majority&appName=Cluster0`);
       server = app.listen(PORT, () => {
       console.log(`App is listening on port ${PORT}`);
       })

    }catch(error){
        console.log(error)
    }
}
main()