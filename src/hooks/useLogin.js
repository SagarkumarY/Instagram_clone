import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import userAuthStore from "../store/authStore";

function useLogin() {
    // Access the showToast function from useShowToast hook
    const showToast = useShowToast();

    // Destructure the signInWithEmailAndPassword function, user, loading, and error from useSignInWithEmailAndPassword hook
    const [
        signInWithEmailAndPassword,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    // Access the loginUser function from userAuthStore
    const loginUser = userAuthStore((state) => state.login);

    // Define the login function
    const login = async (inputs) => {
        // Validate input fields
        if (!inputs.email || !inputs.password) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }

        try {
            // Sign in the user with email and password
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            // If user credentials exist
            if (userCred) {
                // Fetch user data from Firestore
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);

                // Store user data in local storage and log in the user
                localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
                

            }else{
                showToast("Error", "Incorrect email or password", "error");
            }

          

        } catch (error) {
            // Show error toast if login fails
            // showToast("Error", error.message, "error");
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                showToast("Error", "Incorrect email or password", "error");
            } else {
                // Show generic error message for other authentication errors
                showToast("Error", "An error occurred during login", "error");
            }
        }
    };

   

    // Return the login function, loading state, and error
    return { login, loading, error };
}

export default useLogin;














// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../firebase/firebase";
// import useShowToast from "./useShowToast";
// import { doc, getDoc } from "firebase/firestore";
// import userAuthStore from "../store/authStore";


// function useLogin() {
//     const showToast = useShowToast()
//     const [
//         signInWithEmailAndPassword,
//         user,
//         loading,
//         error,
//     ] = useSignInWithEmailAndPassword(auth);

//     const loginUser = userAuthStore((state) => state.login)

//     const login = async (inputs) => {

//         if (!inputs.email || !inputs.password) {
//             showToast("r", "Please fill all the fields", "error")
//             return
//         }

//         try {

//             const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

//             if (userCred) {
//                 const docRef = doc(firestore, "users", userCred.user.uid);
//                 const docSnap = await getDoc(docRef);
//                 localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
//                 loginUser(docSnap.data())

//             }


//             showToast("Success", "You have successfully logged in", "success")
//         } catch (error) {
//             showToast("Error", error.message, "error")
//         }
//     }
//     return { login, loading, error }
// };

// export default useLogin



