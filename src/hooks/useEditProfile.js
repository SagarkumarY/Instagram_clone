// import { useState } from "react";
// import userAuthStore from "../store/authStore";
// import useShowToast from "./useShowToast";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { firestore, storage } from "../firebase/firebase";
// import { doc, updateDoc } from "firebase/firestore";
// import useUserProfileStore from "../store/userProfileStore";


// function useEditProfile() {
//     const [isUpdating, setIsUpdateing] = useState(false);
//     const authUser = userAuthStore(state => state.user);
//     const setAuthUser = userAuthStore(state => state.setUser);
//     const setUserProfile = useUserProfileStore(state => state.setUserProfile);

//     const showToast = useShowToast();

//     const editProfile = async (inputs, selectedFile) => {

//         if (isUpdating || !authUser) return;
//         setIsUpdateing(true);
//         const storageRef = ref(storage, `profilePics/${authUser.uid}`);
//         const userDocRef = doc(firestore, 'users', authUser.uid);
//         const URL = "";
//         try {
//             if (selectedFile) {
//                 await uploadString(storageRef, selectedFile, 'data_url')
//                 URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
//             }
//             const uploadedUser = {
//                 ...authUser,
//                 fullname: inputs.fullname || authUser.fullname,
//                 username: inputs.username || authUser.username,
//                 bio: inputs.bio || authUser.bio,
//                 profilepicURL: URL || authUser.profilepicURL,
//             }

//             await updateDoc(userDocRef, uploadedUser);
//             localStorage.setItem('user-info', JSON.stringify(uploadedUser));
//             setAuthUser(uploadedUser);
//             setUserProfile(uploadedUser);
//             showToast("Success", "Profile updated successfully.", "success")
//         } catch (error) {
//             showToast("Error", error.message, "error");
//         }
//     }

//     return { editProfile, isUpdating }

// }

// export default useEditProfile



import { useState } from "react";
import userAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

function useEditProfile() {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = userAuthStore(state => state.user);
    const setAuthUser = userAuthStore(state => state.setUser);
    const setUserProfile = useUserProfileStore(state => state.setUserProfile);

    const showToast = useShowToast();

    const editProfile = async (inputs, selectedFile) => {
        // Check if already updating or no authenticated user
        if (isUpdating || !authUser) return;

        // Start updating
        setIsUpdating(true);

        // Reference to the storage for user's profile picture
        const storageRef = ref(storage, `profilePics/${authUser.uid}`);

        // Reference to the Firestore document for the user
        const userDocRef = doc(firestore, 'users', authUser.uid);

        // Initialize URL to empty string
        let URL = "";

        try {
            // If a new profile picture is selected, upload it to Firebase Storage
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, 'data_url');
                // Get the download URL for the uploaded profile picture
                URL = await getDownloadURL(storageRef);
            }

            // Prepare updated user object with new data
            const uploadedUser = {
                ...authUser,
                fullname: inputs.fullname || authUser.fullname,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilepicURL: URL || authUser.profilepicURL,
            };

            // Update user document in Firestore
            await updateDoc(userDocRef, uploadedUser);

            // Update local storage with new user info
            localStorage.setItem('user-info', JSON.stringify(uploadedUser));

            // Update auth user state
            setAuthUser(uploadedUser);

            // Update user profile state
            setUserProfile(uploadedUser);

            // Show success toast
            showToast("Success", "Profile updated successfully.", "success");
        } catch (error) {
            // Show error toast if any error occurs
            showToast("Error", error.message, "error");
        } finally {
            // Reset updating status
            setIsUpdating(false);
        }
    };

    return { editProfile, isUpdating };
}

export default useEditProfile;
