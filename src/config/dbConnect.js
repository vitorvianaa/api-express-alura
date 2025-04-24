import mongoose, { mongo } from "mongoose";


async function conectaBanco() {
    mongoose.connect(`mongodb://${process.env.SERVER_MONGO_DB}:${process.env.PORT_MONGO_DB}/curso_alura`)
    return mongoose.connection
}

export default conectaBanco
