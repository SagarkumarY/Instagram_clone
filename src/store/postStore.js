import { create } from "zustand";

// Define a store for managing posts
const usePostStore = create((set) => ({
    // Initial state: an empty array of posts
    posts: [],
    
    // Function to create a new post
    createPost: (post) => set((state) => ({
        // Add the new post to the beginning of the posts array
        posts: [post, ...state.posts]
    })),
    
    // Function to delete a post by ID
    deletePost: (id) => set((state) => ({
        // Filter out the post with the given ID
        posts: state.posts.filter((post) => post.id !== id)
    })),
    
    // Function to set the entire posts array
    setPosts: (posts) => set({ posts }),

    addComment: (postId,comment) => set((state) => ({
        posts: state.posts.map((post) => {
            if (post.id === postId) {
                return{
                    ...post,
                    comments: [...post.comments,comment]
                }
            }
            return post
        })
    })),


}));


export default usePostStore;
