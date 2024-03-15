import { useState } from "react";
import useShowToast from "./useShowToast";
import userAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

// Define the custom hook for handling post comments
function usePostComment() {
    // Define state for managing whether the user is currently commenting
    const [isCommenting, setIsCommenting] = useState(false);

    // Access the showToast function from another custom hook
    const showToast = useShowToast();

    // Access the authenticated user from the userAuthStore
    const authUser = userAuthStore(state => state.user);

    // Access the addComment function from the usePostStore custom hook
    const addComment = usePostStore(state => state.addComment);

    // Define the function for handling posting comments
    const handlePostComment = async (postId, comment) => {
        // If already commenting, prevent duplicate submissions
        if (isCommenting) return;

        // If user is not logged in, display an error message
        if (!authUser) return showToast("Error:", "You must be logged in to comment", "error");

        // Set isCommenting to true to indicate that a comment is being posted
        setIsCommenting(true);

        // Check if comment is defined and not empty
        if (!comment) {
            showToast("Error:", "Comment cannot be empty", "error");
            setIsCommenting(false);
            return;
        }

        // Create a new comment object with necessary details
        const newComment = {
            comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId
        };

        try {
            // Update the Firestore document for the post with the new comment
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment),
            });

            // Update the local state with the new comment
            addComment(postId, newComment);

        } catch (error) {
            // If an error occurs during posting, display an error message
            showToast("Error:", error.message, 'error');
        } finally {
            // Reset the isCommenting state regardless of success or failure
            setIsCommenting(false);
        }
    };

    // Return the state and function necessary for handling post comments
    return { isCommenting, handlePostComment };
};

// Export the custom hook for use in other components
export default usePostComment;
