import { useState } from "react"
import useShowToast from './useShowToast'
import { useEffect } from "react";
import { firestore } from '../firebase/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
function useGetUserProfileByUsername(username) {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast()
    const { userProfile, setUserProfile } = useUserProfileStore()
    //    const userProfile = useUserProfileStore((state) => state.userProfile);


    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true)
            try {
                const q = query(collection(firestore, "users"), where("username", "==", username));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setUserProfile(null)

                let userDoc;

                querySnapshot.forEach((doc) => {
                    userDoc = doc.data()
                })

                setUserProfile(userDoc)
               

            } catch (error) {
                showToast("Error", error.message, "error")
            }finally{
                setIsLoading(false)
            }
        }
        getUserProfile();
    }, [setUserProfile,username,showToast])

    return { isLoading, userProfile }
}

export default useGetUserProfileByUsername