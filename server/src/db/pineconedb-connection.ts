import { Pinecone } from "@pinecone-database/pinecone";

// Initalize Pinecone client
const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

async function connectToPinecone() {
  const pineconeClient = await getPineconeClient();

  // Setting client to use h2jc index
  const pineconeIndex = await pineconeClient.index("h2jc");
}

export { connectToPinecone, getPineconeClient };