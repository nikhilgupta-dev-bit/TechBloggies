import { Client, Databases } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') 
  .setProject('6889f84d003d94da8e67'); 


const databases = new Databases(client);

const databaseId = '6889fa7a001a2e7c03b5';
const collectionId = '6889fde70012192130e0';
const documentId = '688b29f60001b2dad984';

async function getDocument() {
  try {
    const result = await databases.getDocument(
      databaseId,
      collectionId,
      documentId
    );
    console.log(result);
  } catch (error) {
    console.error('Error getting document:', error);
  }
}

getDocument();
