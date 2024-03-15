// import { Flex, Img, Text } from "@chakra-ui/react";
// import React from "react";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../../firebase/firebase";
// import useShowToast from "../../hooks/useShowToast";
// import userAuthStore from "../../store/authStore";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// function GoogleAuth({ prefix }) {
//   const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
//   const showToast = useShowToast();
//   const loginUser = userAuthStore((state) => state.login);

//   const handleGoogleAuth = async () => {
//     try {
//       const newUser = await signInWithGoogle();

//       if (!newUser && error) {
//         showToast("Error", error.message, "error");
//         return;
//       }

//       const userRef = doc(firestore, "user", newUser.user.uid);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         const userDoc = userSnap.data();
//         localStorage.setItem("user-info", JSON.stringify(userDoc));
//         loginUser(userDoc);
//       } else {
//         const userDoc = {
//           uid: newUser.user.uid,
//           email: newUser.user.email,
//           username: newUser.user.email.split("@")[0],
//           fullname: newUser.user.displayName,
//           bio: "",
//           profilepicURL: newUser.user.photoURL,
//           followers: [],
//           following: [],
//           posts: [],
//           createdAt: new Date(),
//         };

//         await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
//         localStorage.setItem("user-info", JSON.stringify(userDoc));
//         loginUser(userDoc);
//       }
//     } catch (error) {
//       showToast("Error", error.message, "error");
//     }
//   };

//   return (
//     <Flex
//       alignItems={"center"}
//       justifyContent={"center"}
//       cursor={"pointer"}
//       onClick={handleGoogleAuth}
//     >
//       <Img src="/google.png" alt="google_logo" width="20px" />

//       <Text mx="2" color={"blue.500"}>
//         {prefix} with Google
//       </Text>
//     </Flex>
//   );
// }

// export default GoogleAuth;





import { Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import userAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

function GoogleAuth({ prefix }) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = userAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();

      // Handle if signInWithGoogle returns null and an error occurred
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid); // Corrected firestore path
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // If user exists, retrieve user data from Firestore
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        // If user doesn't exist, create a new user document
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullname: newUser.user.displayName,
          bio: "",
          profilepicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: new Date(),
        };

        // Set the newly created user document in Firestore
        await setDoc(userRef, userDoc); // Corrected firestore path
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      // Catch and display any errors that occur during authentication or document creation
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Img src="/google.png" alt="google_logo" width="20px" />

      <Text mx="2" color={"blue.500"}>
        {prefix} with Google
      </Text>
    </Flex>
  );
}

export default GoogleAuth;
