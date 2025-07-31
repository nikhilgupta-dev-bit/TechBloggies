import { Client, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'posts';

const handleError = (error, operation) => {
  console.error(`Error ${operation}:`, error);
  throw new Error(`Failed to ${operation}: ${error.message}`);
};

const cleanAppwriteDocument = (doc) => {
  const cleanedDoc = { ...doc };
  delete cleanedDoc.$id;
  delete cleanedDoc.$createdAt;
  delete cleanedDoc.$updatedAt;
  delete cleanedDoc.$permissions;
  delete cleanedDoc.$databaseId; 
  delete cleanedDoc.$collectionId;
  return cleanedDoc;
};

// Function to create a new post 
export async function createPost(post) {
  try {
    
    const dataToCreate = cleanAppwriteDocument({
      ...post,
      created_at: new Date().toISOString()
    });
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      dataToCreate
    );
  } catch (error) {
    handleError(error, 'create post');
  }
}
// Function to retrieve all posts 
export async function getAllPosts(page = 1, limit = 100) {
  try {
    const offset = (page - 1) * limit;
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.orderDesc('created_at'),
        Query.limit(limit),
        Query.offset(offset)
      ]
    );
    return {
      posts: response.documents,
      total: response.total,
      hasMore: response.documents.length === limit
    };
  } catch (error) {
    handleError(error, 'fetch posts');
  }
}
// Function to retrieve a post by its ID
export async function getPostById(postId) {
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTION_ID, postId);
  } catch (error) {
    handleError(error, 'fetch post by ID');
  }
}
// Function to update a post
export async function updatePost(postId, updates) {
  try {
    // Clean the updates object to ensure no internal Appwrite attributes are passed
    const dataToUpdate = cleanAppwriteDocument(updates);
    return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, postId, dataToUpdate);
  } catch (error) {
    handleError(error, 'update post');
  }
}
// Function to delete a post
export async function deletePost(postId) {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, postId);
    return true;
  } catch (error) {
    handleError(error, 'delete post');
  }
}
export async function getPostsByCategory(category) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal('category', category),
        Query.orderDesc('created_at')
      ]
    );
    return response.documents;
  } catch (error) {
    handleError(error, 'fetch posts by category');
  }
}
export async function getPostsByAuthor(author) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal('author', author),
        Query.orderDesc('created_at')
      ]
    );
    return response.documents;
  } catch (error) {
    handleError(error, 'fetch posts by author');
  }
}
export async function searchPosts(searchTerm) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.search('title', searchTerm),
        Query.orderDesc('created_at')
      ]
    );
    return response.documents;
  } catch (error) {
    handleError(error, 'search posts');
  }
}
