import { useState } from "react";
// Importing custom hook useShowToast
import useShowToast from "./useShowToast";
// Importing Firestore functions for querying
import { collection, getDocs, query, where } from "firebase/firestore";
// Importing the Firestore instance
import { firestore } from "../firebase/firebase";

// Defining the custom hook useSearchUser
function useSearchUser() {
    // State to manage loading state
    const [isLoading, setIsLoading] = useState(false);
    // State to store the user data
    const [user, setUser] = useState(null);
    // Accessing showToast function from useShowToast hook
    const showToast = useShowToast();

    // Function to get user profile based on username
    const getuserProfile = async (username) => {
        // Set isLoading state to true before the operation is started
        setIsLoading(true);
        setUser(null)
        try {

            // Creating a Firestore query to find user by username
            const q = query(collection(firestore, "users"), where("username", "==", username));
            // Fetching the documents that match the query
            const querySnapshot = await getDocs(q);
            // If no user is found with the given username, display an error toast
            if (querySnapshot.empty) return showToast("Error", "User not found", "error");
            // If user(s) found, loop through the documents
            querySnapshot.forEach((doc) => {
                // Update user state with the data of the first document found (assuming unique usernames)
                setUser(doc.data());
            });
        } catch (error) {
            // If any error occurs during the process, display an error toast and set user state to null
            showToast("Error", error.message, "error");
            setUser(null);
        } finally {
            // Set isLoading state to false after the operation is completed
            setIsLoading(false);
        }
    };

    // Returning user data, loading state, and the function to get user profile
    return { user, isLoading, getuserProfile, setUser };
}

// Exporting the custom hook useSearchUser
export default useSearchUser;
