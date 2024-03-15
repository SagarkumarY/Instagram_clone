// import { useState ,useEffect} from "react"
// import userAuthStore from "../store/authStore";
// import useUserProfileStore from "../store/userProfileStore";
// import useShowToast from "./useShowToast";
// import { firestore } from "../firebase/firebase";
// import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

// function useFollowUser(userId) {
//     const [isUpdating, setIsUpdating] = useState(false);
//     const [isFollowing, setIsFollowing] = useState(false);
//     const { authUser, setAuthUser } = userAuthStore();
//     const { userProfile, setUserProfile } = useUserProfileStore();
//     const showToast = useShowToast();

//     const handleFolloUser = async () => {
//         setIsUpdating(true);
//         try {
//             const currentUserRef = doc(firestore, "users", authUser.uid);
//             const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

//             await updateDoc(currentUserRef, {
//                 following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
//             });

//             await updateDoc(userToFollowOrUnfollowRef, {
//                 followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
//             });


//             if (isFollowing) {
//                 setAuthUser({
//                     ...authUser,
//                     following: authUser.following.filter(uid => uid !== authUser.uid)
//                 });

//                 setUserProfile({
//                     ...userProfile,
//                     followers: userProfile.followers.filter(uid => uid !== authUser.uid)
//                 });
//                 localStorage.setItem('user-info',JSON.stringify({
//                     ...authUser,
//                     following: authUser.following.filter(uid => uid !== userId)
//                 }));

//                 setIsFollowing(false)
//             } else {
//                  setAuthUser({
//                     ...authUser,
//                     following: [...authUser.following,userId]
//                  });

//                  setUserProfile({
//                   ...userProfile,
//                     followers: [...userProfile.followers, authUser.uid ]
//                  });
//                  localStorage.setItem('user-info',JSON.stringify({
//                   ...authUser,
//                     following: [...authUser.following, userId]
//                  }));

//                  setIsFollowing(true)
//             }


//         } catch (error) {
//             showToast("Error", error.message, "error")
//         } finally {
//             setIsUpdating(false)
//         }
//     }



//     useEffect(() => {
//         if (authUser) {
//             const isFollowing = authUser.following.include(userId);
//             setIsFollowing(isFollowing)
//         }
//     }, [authUser, userId])

//     return { isUpdating, isFollowing, handleFolloUser }


// }

// export default useFollowUser;








import { useState, useEffect } from "react";
import userAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function useFollowUser(userId) {
    // State variables to track the updating status and whether the user is currently following the target user
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    // Get authUser and userProfile data from respective stores
    const authUser = userAuthStore(state => state.user);
    const setAuthUser = userAuthStore(state => state.setUser);

    const { userProfile, setUserProfile } = useUserProfileStore();

    // Custom hook to display toasts
    const showToast = useShowToast();

    // Function to handle following/unfollowing a user
    const handleFollowUser = async () => {
        // Start updating
        setIsUpdating(true);
        try {
            // Reference to the current user document
            const currentUserRef = doc(firestore, "users", authUser.uid);
            // Reference to the user being followed/unfollowed
            const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

            // Update following array of current user
            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            });

            // Update followers array of the user being followed/unfollowed
            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });

            // Update authUser and userProfile states and local storage based on follow/unfollow action
            if (isFollowing) {
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)
                });

                if(userProfile)
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid => uid !== authUser.uid)
                });

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)
                }));

                setIsFollowing(false);
            } else {
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId]
                });
                
                if(userProfile)
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, authUser.uid]
                });

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userId]
                }));

                setIsFollowing(true);
            }
        } catch (error) {
            // Display error toast if any error occurs
            showToast("Error", error.message, "error");
        } finally {
            // Reset updating status
            setIsUpdating(false);
        }
    };

    // Effect to determine if the current user is already following the target user
    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authUser, userId]);

    // Return state variables and the function to handle following/unfollowing
    return { isUpdating, isFollowing, handleFollowUser };
}

export default useFollowUser;
