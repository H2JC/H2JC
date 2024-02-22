import mongoose from "mongoose";

const Schema = mongoose.Schema;

const queriesSchema = new Schema ({
    queries: {
        type: "string",
        required: true,
    },
})


const Queries = mongoose.model('queries', queriesSchema);

export default Queries;