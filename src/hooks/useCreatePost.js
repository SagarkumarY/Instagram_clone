import { useState } from "react";
import useShowToast from "./useShowToast";
import userAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function useCreatePost() {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = userAuthStore(state => state.user);
    // Get the createPost function from the post store
    const createPost = usePostStore(state => state.createPost);
    // Get the addPost function from the user profile store
    const addPost = useUserProfileStore(state => state.addPost);
    const userProfile = useUserProfileStore(state => state.userProfile);
    const { pathname } = useLocation();

    const handleCreatePost = async (selectedFile, caption) => {
        // Prevent creating post if already loading
        if (isLoading) return;
        // Throw an error if no image selected
        if (!selectedFile) throw new Error("Please select an image");
        setIsLoading(true);

        // Define the new post object
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid
        }

        try {
            // Add the new post document to Firestore
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            // Get a reference to the current user document
            const userDocRef = doc(firestore, "users", authUser.uid);
            // Get a reference to the storage location for the image
            const imageRef = ref(storage, `posts/${postDocRef.id}`);

            // Update the user's posts array to include the new post ID
            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
            // Upload the image to storage
            await uploadString(imageRef, selectedFile, "data_url");
            // Get the download URL for the uploaded image
            const downloadURL = await getDownloadURL(imageRef);

            // Update the post document with the imageURL
            await updateDoc(postDocRef, { imageURL: downloadURL });

            // Update the post store with the new post
            if(userProfile.uid  === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

                 // Update the user profile store with the new post
            if(pathname !== '/' && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });
            

            // Show success toast
            showToast("Success", "Post created successfully");

        } catch (error) {
            // Show error toast if any error occurs
            showToast("Error", error.message, "error");
        } finally {
            // Reset loading state
            setIsLoading(false);
        }

    };

    // Return the function to create post and loading state
    return { handleCreatePost, isLoading };
};

export default useCreatePost;




















// import { useState } from "react";
// import useShowToast from "./useShowToast";
// import userAuthStore from "../store/authStore";
// import usePostStore from "../store/postStore";
// import useUserProfileStore from "../store/userProfileStore";
// import { useLocation } from "react-router-dom";
// import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
// import { firestore, storage } from "../firebase/firebase";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";

// function useCreatePost() {
//     const showToast = useShowToast();
//     const [isLoading, setIsLoading] = useState(false);
//     const authUser = userAuthStore(state => state.user);
//     const createPost = usePostStore(state => state.createPost);
//     const addPost = useUserProfileStore(state => state.addPost);
//     const { pathname } = useLocation();

//     const handleCreatePost = async (selectedFile, caption) => {
//         if (isLoading) return;
//         if (!selectedFile) throw new Error("Please select an image");
//         setIsLoading(true);
//         const newPost = {
//             caption: caption,
//             likes: [],
//             comments: [],
//             createdAt: Date.now(),
//             createdBy: authUser.uid
//         }

//         try {
//             const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
//             const userDocRef = doc(firestore, "users", authUser.uid);
//             const imageRef = ref(storage, `posts/${postDocRef.id}`);
//             await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
//             await uploadString(imageRef, selectedFile, "data_url");
//             const downloadURL = await getDownloadURL(imageRef);

//             await updateDoc(postDocRef, { imageURL: downloadURL });
//             createPost({ ...newPost, id: postDocRef.id });

//             addPost({ ...newPost, id: postDocRef.id });
//             showToast("Success", "Post created successfully");

//         } catch (error) {
//             showToast("Error", error.message, "error");
//         } finally {
//             setIsLoading(false);
//         }

//     };
//     return { handleCreatePost, isLoading };
// };


// export default useCreatePost;