import { Client, Databases, ID, Query } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6889f84d003d94da8e67';

let client, databases;

// Only initialize on client side or when environment variables are available
if (typeof window !== 'undefined' || (endpoint && projectId)) {
  try {
    client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId);
    
    databases = new Databases(client);
  } catch (error) {
    console.error('Appwrite initialization failed:', error);
  }
}

// Fallback for server-side rendering
if (!client) {
  client = {
    setEndpoint: () => client,
    setProject: () => client
  };
}

if (!databases) {
  databases = {
    getDocument: () => Promise.resolve(null),
    listDocuments: () => Promise.resolve({ documents: [], total: 0 }),
    createDocument: () => Promise.resolve({}),
    updateDocument: () => Promise.resolve({}),
    deleteDocument: () => Promise.resolve({})
  };
}

export { client, databases, ID, Query };