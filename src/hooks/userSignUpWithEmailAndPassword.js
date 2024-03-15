// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { auth, firestore } from '../firebase/firebase'
// import { collection, doc,  getDocs, query, setDoc, where } from 'firebase/firestore';
// import userAuthStore from '../store/authStore';
// import useShowToast from './useShowToast';


// function userSignUpWithEmailAndPassword() {
//     const loginUser = userAuthStore(state => state.login)

//     const [
//         createUserWithEmailAndPassword,
//         loading,
//         error,
//     ] = useCreateUserWithEmailAndPassword(auth);

//     const showToast = useShowToast()
//     const signup = async (inputs) => {
//         if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
//             showToast("r", "Please fill all the fields", "error")
//             return
//         }

//         // query firesoter 

//         const usersRef = collection(firestore, "users");

//         const q = query(usersRef, where("username", "==", inputs.username));

//         const querySnapshot = await getDocs(q)

//            if(!querySnapshot.empty){
//             showToast("r", "Username already exists", "error")
//             return
//            }

//         // if (querySnapshot.exists()) {
//         //     showToast("r", "Username already taken", "error")
//         //     return
//         // }

//         try {
//             const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
//             if (!newUser && error) {
//                 showToast("Error", error.message, "error")
//                 return
//             }

//             if (newUser) {
//                 const userDoc = {
//                     uid: newUser.user.uid,
//                     email: inputs.email,
//                     username: inputs.username,
//                     fullname: inputs.fullname,
//                     bio: "",
//                     profilepicURL: "",
//                     followers: [],
//                     following: [],
//                     posts: [],
//                     createdAt: new Date(),
//                 }
//                 await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
//                 localStorage.setItem('user-info', JSON.stringify(userDoc));
//                 loginUser(userDoc)
//             }
//         } catch (error) {
//             showToast("Error", error.message, "error");
//         }


//     }

//     return { loading, error, signup }
// }

// export default userSignUpWithEmailAndPassword



import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, getDocs, setDoc, query, where } from 'firebase/firestore'; // Changed from getDoc to getDocs
import userAuthStore from '../store/authStore';
import useShowToast from './useShowToast';

function userSignUpWithEmailAndPassword() {
    const loginUser = userAuthStore(state => state.login);
    const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();

    const signup = async (inputs) => {
        try {
            // Validate input fields
            if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
                showToast("Error", "Please fill all the fields", "error");
                return;
            }

            // Check if username already exists
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("username", "==", inputs.username));
            const querySnapshot = await getDocs(q); // Changed from getDoc to getDocs

            if (!querySnapshot.empty) { // Changed to check if not empty
                showToast("Error", "Username already exists", "error");
                return;
            }

            // Create user with email and password
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

            // If newUser is null or there's an error, show an error toast and return
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }

            // Create user document in Firestore
            const userDoc = {
                uid: newUser.user.uid,
                email: inputs.email,
                username: inputs.username,
                fullname: inputs.fullname,
                bio: "",
                profilepicURL: "",
                followers: [],
                following: [],
                posts: [],
                createdAt: new Date(),
            };

            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
            localStorage.setItem('user-info', JSON.stringify(userDoc));
            loginUser(userDoc);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, signup };
}

export default userSignUpWithEmailAndPassword;
