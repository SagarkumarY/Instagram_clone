// import React, { useEffect, useState } from 'react'
// import usePostStore from '../store/postStore';
// import useShowToast from './useShowToast';
// import useUserProfileStore from '../store/userProfileStore';
// import { collection, getDoc, query, where } from 'firebase/firestore';
// import { firestore } from '../firebase/firebase';

// function useGetUserPosts() {
//  const [isLoading, setIsLoading] = useState(true);
//  const {posts,setPosts} = usePostStore();
//  const showToast = useShowToast();
//  const userProfile = useUserProfileStore(state => state.userProfile);


//  useEffect(()=>{
//     const getPosts = async () => {
//         if(!userProfile) return ;
//         setIsLoading(true);
//         setPosts([]);

//         try {
//             const q = query(collection(firestore,"posts"), where("createdBy", "==" ,userProfile.uid));
//             const querySnapshot = await getDoc(q);
//             const posts = [];
//             querySnapshot.forEach((doc) => {
//                 posts.push({...doc.data(),id:doc.id});
//             });
//             posts.short((a,b) => b.createdAt - a.createdAt)
//             setPosts(posts);
//         } catch (error) {
//             showToast("Error", error.message ,"error");
//             setPosts([]);
//         }finally{
//             setIsLoading(false);
//         }
//     }
//  },[setPosts, userProfile,showToast])
// }

// export default useGetUserPosts;


import  { useEffect, useState } from 'react';
import usePostStore from '../store/postStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Changed getDoc to getDocs
import { firestore } from '../firebase/firebase';

function useGetUserPosts() {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore(state => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) return;
            setIsLoading(true);

            try {
                // Query all posts where createdBy equals userProfile's uid
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
                const querySnapshot = await getDocs(q); // Changed getDoc to getDocs
                const posts = [];

                querySnapshot.forEach((doc) => {
                    // Push each post document data along with its id into the posts array
                    posts.push({ ...doc.data(), id: doc.id });
                });

                // Sort posts by createdAt (descending order)
                posts.sort((a, b) => b.createdAt - a.createdAt);

                // Update the posts in the store
                setPosts(posts);
            } catch (error) {
                // Show error toast if there's an error fetching posts
                showToast("Error", error.message, "error");
                setPosts([]); // Clear posts in case of error
            } finally {
                setIsLoading(false);
            }
        };

        getPosts(); // Call getPosts function
    }, [setPosts, userProfile, showToast]); // Dependency array for useEffect

    return { isLoading, posts };
}

export default useGetUserPosts;
