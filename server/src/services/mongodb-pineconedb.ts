import Users from '../models/User';
import { getPineconeClient } from "../db/pineconedb-connection";
import { OpenAIEmbeddings } from "@langchain/openai";

async function pineconeWatch() {
  Users.watch().on('change', async (data) => {
    // Initalize OpenAIEmbeddings model
    const embeddingsModel = new OpenAIEmbeddings();

    // Setting Pinecone client to use h2jc index
    const pineconeClient = await getPineconeClient();
    const pineconeIndex = await pineconeClient.index("h2jc");

    // If a new document is inserted into the collection, replicate its vector in Pinecone
    if (data.operationType === 'insert') {
        let document = data.fullDocument;
        const docId = document._id;

        if (!Array.isArray(document)) {
            document = [document];
        }

        document = document.map(t => String(t));

        const embeddings = await embeddingsModel.embedDocuments(document);

        const records = embeddings.map((embedding) => ({
            id: `${docId}`,
            values: embedding,
        }));
        
        await pineconeIndex.upsert(records);

        console.log("Pinecone updated with new vector.");
    }
  });
}

export { pineconeWatch };