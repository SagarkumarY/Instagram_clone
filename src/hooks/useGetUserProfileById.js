// import { useState, useEffect } from "react";
// import useShowToast from "./useShowToast";
// import { getDoc, doc } from "firebase/firestore"; // Import doc from firebase/firestore
// import { firestore } from "../firebase/firebase";

// function useGetUserProfileById(userId) {
//     const [isLoading, setIsLoading] = useState(true);
//     const [userProfile, setUserProfile] = useState(null);
//     const showToast = useShowToast();
//     console.log(userId)

//     useEffect(() => {
//         const getUserProfile = async () => {
//             setIsLoading(true);
//             setUserProfile(null);

//             try {
//                 // Use the passed userId instead of useId
//                 const userRef = await getDoc(doc(firestore, "users", userId));

//                 if (userRef.exists()) {
//                     // Access the data using userRef.data()
//                     // const userDoc = userRef.data();
//                     // setUserProfile(userDoc);
//                     setUserProfile(userRef.data())
//                 } else {
//                     // Handle the case where the user does not exist
//                     showToast("Error", "User not found", "error");
//                 }
//             } catch (error) {
//                 showToast("Error", error.message, "error");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         // Call the function only if userId is provided
//         // if (userId) {
//         getUserProfile();
//         // }
//     }, [showToast, setUserProfile, userId]);

//     return { userProfile, isLoading };
// }

// export default useGetUserProfileById;

// import { useEffect, useState } from "react";
// import useShowToast from "./useShowToast";
// import { doc, getDoc } from "firebase/firestore";
// import { firestore } from "../firebase/firebase";

// const useGetUserProfileById = (userId) => {
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [userProfile, setUserProfile] = useState(null);

// 	const showToast = useShowToast();

// 	useEffect(() => {
// 		const getUserProfile = async () => {
// 			setIsLoading(true);
// 			setUserProfile(null);
// 			try {
// 				const userRef = await getDoc(doc(firestore, "users", userId));
// 				if (userRef.exists()) {
// 					setUserProfile(userRef.data());
// 				}
//                 console.log(userRef.data().username)
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};
// 		getUserProfile();
// 	}, [showToast, setUserProfile, userId]);

// 	return { isLoading, userProfile, setUserProfile };
// };

// export default useGetUserProfileById;


import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            setUserProfile(null);
            try {
                const userRef = await getDoc(doc(firestore, "users", userId));
                if (userRef.exists()) {
                    const userData = userRef.data();
                    // Check if the 'username' field exists before accessing it
                    if (userData && userData.username) {
                        setUserProfile(userData);
                    } else {
                        showToast("Error", "Username not found", "error");
                    }
                } else {
                    showToast("Error", "User not found", "error");
                }
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    }, [showToast, userId]);

    return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
