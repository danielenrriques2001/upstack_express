import mongoose from "mongoose";

const ConnectDB = async()  => {
    try {

        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`;

        console.log('Mongo db Connected', url)
        
    } catch (error) {
        console.log(`error message: ${error.message}`)
        process.exit(1)
    }
}

export default ConnectDB;