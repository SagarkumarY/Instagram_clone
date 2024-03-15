import { useState } from "react";
import userAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";

// Custom hook to handle post liking functionality
function useLikePost(post) {

    if (!post || !post.id || !post.likes) {
        throw new Error("Invalid post object"); // Throw an error if the post object is invalid or empty
    }
    // State variables for managing like functionality
    const [isUpdating, setIsUpdating] = useState(false); // State to track update status
    const authUser = userAuthStore((state) => state.user); // Get authenticated user from store
    const [likes, setLikes] = useState(post.likes.length); // State to track number of likes
    const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid)); // State to track if post is liked
    const showToast = useShowToast(); // Custom hook to display toast messages

    // Function to handle post like action
    const handleLikePost = async () => {
        // Return if update is already in progress
        if (isUpdating) return;

        // Return if user is not logged in
        if (!authUser) {
            showToast("Error", "You must be logged in to like a post", "error");
            return;
        }

        // Set update status to true
        setIsUpdating(true);

        try {
            const postRef = doc(firestore, "posts", post.id); // Get Firestore reference to the post
            // Update post document in Firestore to add/remove user ID from likes array based on current like status
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });

            // Update local state to reflect like/unlike action
            setIsLiked(!isLiked);
            setLikes(isLiked ? likes - 1 : likes + 1);
            // isLiked ? setIsLiked(likes - 1) : setIsLiked(likes + 1);
        } catch (error) {
            showToast("Error", error.message, "error"); // Display error toast message
        } finally {
            // Set update status to false
            setIsUpdating(false);
        }
    };

    // Return state and function to be used by the component
    return { isUpdating, likes, isLiked, handleLikePost };
}

export default useLikePost;


