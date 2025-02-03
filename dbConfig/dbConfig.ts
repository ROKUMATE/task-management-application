import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.log(uri);
            throw new Error('MONGODB_URI is not defined');
        }
        await mongoose.connect(uri);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Connected to the Database');
        });
        connection.on('error', (error) => {
            console.log(
                'There was an error while connecting to the Database ',
                error
            );
            process.exit();
        });
    } catch (error) {
        console.log('Couldnt Connect to the Database', error);
    }
}
