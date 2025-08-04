import { databases, ID, Query } from './appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'posts';

const handleError = (error, operation) => {
  console.error(`Error ${operation}:`, error);
  return { error: true, message: `Failed to ${operation}: ${error.message}` };
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

export async function createPost(post) {
  try {
    if (!databases) return { error: true, message: 'Database not available' };
    
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
    return handleError(error, 'create post');
  }
}

export async function getAllPosts(page = 1, limit = 100) {
  try {
    if (!databases || !DATABASE_ID || !COLLECTION_ID) {
      return { posts: [], total: 0, hasMore: false };
    }
    
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
    
    if (!response || !response.documents) {
      return { posts: [], total: 0, hasMore: false };
    }
    
    return {
      posts: response.documents,
      total: response.total || 0,
      hasMore: response.documents.length === limit
    };
  } catch (error) {
    console.error('getAllPosts error:', error);
    return { posts: [], total: 0, hasMore: false };
  }
}

export async function getPostById(postId) {
  try {
    if (!DATABASE_ID || !COLLECTION_ID) {
      return { error: true, message: 'Database or collection ID not set' };
    }

    if (!databases) {
      return { error: true, message: 'Appwrite database client not initialized' };
    }

    const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, postId);
    return response;
  } catch (error) {
    return handleError(error, 'fetch post by ID');
  }
}

export async function updatePost(postId, updates) {
  try {
    if (!databases) return { error: true, message: 'Database not available' };
    
    const dataToUpdate = cleanAppwriteDocument(updates);
    return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, postId, dataToUpdate);
  } catch (error) {
    return handleError(error, 'update post');
  }
}

export async function deletePost(postId) {
  try {
    if (!databases) return false;
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, postId);
    return true;
  } catch (error) {
    handleError(error, 'delete post');
    return false;
  }
}

export async function getPostsByCategory(category) {
  try {
    if (!databases) return [];
    
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
    return handleError(error, 'fetch posts by category');
  }
}

export async function getPostsByAuthor(author) {
  try {
    if (!databases) return [];
    
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
    return handleError(error, 'fetch posts by author');
  }
}

export async function searchPosts(searchTerm) {
  try {
    if (!databases) return [];
    
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
    return handleError(error, 'search posts');
  }
}

export async function countPosts() {
  try {
    if (!databases) return 0;
    
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(1)]
    );
    return response.total;
  } catch (error) {
    return handleError(error, 'count posts');
  }
}