import mongoose from 'mongoose'

// Inject type
export type DbService = mongoose.Mongoose

export const buildDB = async (): Promise<DbService>  => {
    return new Promise<DbService>(async (resolve, reject) => {
        const connectionString = 'mongodb://rec:rec@0.0.0.0:3002/recDB?authSource=admin'

        
        const dbService = mongoose.connection;
        dbService.on("error", (e: Error) => reject(e) )
        dbService.on("open", () => resolve(mongoose) )

        mongoose.connect(connectionString)
    })
    
}