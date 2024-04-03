import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // if database is connected don't connect
    if(connected){
        console.log('mongodb is already connected...');
        return;
    }

    //connect to mongodb
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('MongoDB is connected...');
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;