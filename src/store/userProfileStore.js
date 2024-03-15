// import { create } from "zustand";


// const useUserProfileStore = create((set)=>({
//     userProfile:null,
//     setUserProfile: (userProfile) => set({userProfile}),
//     addPost: (post) => set(state => ({
//         userProfile: {
//          ...state.userProfile,
//             posts: [post.id,...state.userProfile.posts]
//         }
//     }))
// }));

// export default useUserProfileStore;


import { create } from "zustand";

// Creating a store using Zustand's `create` function
const useUserProfileStore = create((set) => ({
    // Initial state: userProfile is set to null
    userProfile: null,
    
    // Function to set the userProfile
    setUserProfile: (userProfile) => set({ userProfile }),
    
    // Function to add a post to the userProfile
    addPost: (post) => set((state) => ({
        // Update the userProfile with the new post
        userProfile: {
            // Spread the current userProfile object
            ...state.userProfile,
            // Update the posts array by adding the new post ID at the beginning
            posts: [post.id, ...state.userProfile.posts]
        }
    })),
    deletePost: (postId) => set((state)=> ({
        userProfile:{
            ...state.userProfile,
             posts: state.userProfile.posts.filter(id => id!== postId)
        }
    }))
}));


export default useUserProfileStore;
