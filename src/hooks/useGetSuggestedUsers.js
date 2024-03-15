// import { useState } from "react"
// import userAuthStore from "../store/authStore";
// import useShowToast from "./useShowToast";
// import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
// import { firestore } from "../firebase/firebase";


// function useGetSuggestedUsers() {
//     const [isLoading, setIsLoading] = useState(true);
//     const [suggestedUsers, setSuggestedUsers] = useState([]);
//     const authUser = userAuthStore(state => state.user);
//     const showToast = useShowToast();

//     useEffect(() => {
//         const getSuggestedUsers = async () => {
//             setIsLoading(true)
//             try {
//                 const usersRef = collection(firestore, 'users');
//                 const q = query(
//                     usersRef,
//                     where("uid", "not-in", [authUser.uid, ...authUser.following]),
//                     orderBy('uid'),
//                     limit(3)
//                 )
//                 const querySnapshot = await getDocs(q);
//                 const users = [];
//                 querySnapshot.forEach((doc) => {
//                     users.push({ ...doc.data(), id: doc.id })
//                 })
//                 setSuggestedUsers(users)
//             } catch (error) {

//                 showToast("Error", error.message, "error")
//             }finally{
//                 setIsLoading(false)
//             }
//         }
//         if(authUser) getSuggestedUsers();
//     }, [authUser,showToast])

//     return { isLoading, suggestedUsers }

// };

// export default useGetSuggestedUsers;


import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import userAuthStore from "../store/authStore"; // Importing userAuthStore
import useShowToast from "./useShowToast"; // Importing useShowToast custom hook
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"; // Importing Firestore functions
import { firestore } from "../firebase/firebase"; // Importing Firestore instance

function useGetSuggestedUsers() {
    // State for managing loading state
    const [isLoading, setIsLoading] = useState(true);
    // State for storing suggested users
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    // Getting authenticated user from userAuthStore
    const authUser = userAuthStore(state => state.user);
    // Accessing showToast function from useShowToast hook
    const showToast = useShowToast();

    useEffect(() => {
        // Function to fetch suggested users
        const getSuggestedUsers = async () => {
            setIsLoading(true); // Set loading state to true
            try {
                const usersRef = collection(firestore, 'users'); // Reference to the 'users' collection
                const q = query(
                    usersRef,
                    where("uid", "not-in", [authUser.uid, ...authUser.following]), // Filtering users not followed by the authenticated user
                    orderBy('uid'), // Ordering users by UID
                    limit(3) // Limiting the number of suggested users to 3
                );
                const querySnapshot = await getDocs(q); // Fetching documents based on the query
                const users = []; // Array to store suggested users
                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id }); // Pushing user data along with document ID to the array
                });
                setSuggestedUsers(users); // Setting the suggested users state
            } catch (error) {
                showToast("Error", error.message, "error"); // Displaying an error toast if an error occurs
            } finally {
                setIsLoading(false); // Set loading state to false after the operation
            }
        };
        // Fetching suggested users only if the authenticated user is available
        if (authUser) {
            getSuggestedUsers();
        }
    }, [authUser, showToast]); // Dependency array for useEffect

    // Returning loading state and suggested users
    return { isLoading, suggestedUsers };
}

// Exporting the useGetSuggestedUsers hook as the default export
export default useGetSuggestedUsers;
