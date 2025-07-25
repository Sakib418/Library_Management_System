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
       await mongoose.connect(process.env.DATEBASE_URL as string);
       server = app.listen(PORT, () => {
       console.log(`App is listening on port ${PORT}`);
       })

    }catch(error){
        console.log(error)
    }
}
main()