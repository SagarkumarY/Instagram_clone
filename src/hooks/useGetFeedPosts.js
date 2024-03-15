import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import userAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, query, where, getDocs } from "firebase/firestore"; // Changed getDoc to getDocs
import { firestore } from "../firebase/firebase";

// Custom hook to fetch feed posts for the authenticated user
function useGetFeedPosts() {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const authUser = userAuthStore(state => state.user);
    const showToast = useShowToast();
    const { setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const fetchFeedPosts = async () => {
            setIsLoading(true);

            // If user is not authenticated or not following anyone, set posts to an empty array and stop loading
            // if (!authUser || authUser.following.length === 0) {
            //     setIsLoading(false);
            //     setPosts([]);
            //     return;
            // }
            if (authUser.following.length === 0) {
				setIsLoading(false);
				setPosts([]);
				return;
			}

            // Query Firestore to get posts created by users followed by the authenticated user
            const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
            try {
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

                // Iterate over the query snapshot and push post data into feedPosts array
                querySnapshot.forEach((doc) => {
                    // feedPosts.push({ ...doc.data(), id: doc.id });
                    feedPosts.push({ id: doc.id, ...doc.data() });
                });

                // Sort feedPosts by createdAt timestamp in descending order
                feedPosts.sort((a, b) => b.createdAt - a.createdAt);

                // Set the feed posts in the global state
                setPosts(feedPosts);
            } catch (error) {
                showToast("Error", error.message, "error"); // Display error toast message
            } finally {
                setIsLoading(false); // Set loading status to false after fetching data
            }
        };

        // If user is authenticated, fetch feed posts
        if (authUser) {
            fetchFeedPosts();
        }
    }, [authUser, showToast, setPosts, setUserProfile]);

    return { isLoading, posts };
}

export default useGetFeedPosts;






// import { useEffect, useState } from "react"
// import usePostStore from "../store/postStore";
// import userAuthStore from "../store/authStore";
// import useShowToast from "./useShowToast";
// import useUserProfileStore from "../store/userProfileStore";
// import { collection, getDoc, query, where } from "firebase/firestore";
// import { firestore } from "../firebase/firebase";


// function useGetFeedPosts() {
//     const [isLoading, setIsLoading] = useState(true);
//     const { posts, setPosts } = usePostStore();
//     const authUser = userAuthStore(state => state.user);
//     const showToast = useShowToast();
//     const { setUserProfile } = useUserProfileStore();

//     useEffect(() => {
//         const useGetFeedPosts = async () => {
//             setIsLoading(true);
//             if (authUser.following.length === 0) {
//                 setIsLoading(false);
//                 setPosts([]);
//                 return;
//             }
//             const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
//             try {
//                 const querySnapshot = await getDoc(q);
//                 const feedPosts = [];
//                 querySnapshot.forEach((doc) => {
//                     feedPosts.push({ ...doc.data(), id: doc.id });
//                 });
//                 feedPosts.short((a, b) => b.createdAt - a.createdAt);
//                 setPosts(feedPosts);
//             } catch (error) {
//                 showToast("Error:", error.message, "error");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         if (authUser) useGetFeedPosts();
//     }, [authUser, showToast, setPosts, setUserProfile])

//     return { isLoading, posts }
// };

// export default useGetFeedPosts