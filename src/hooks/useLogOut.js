import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase'
import useShowToast from './useShowToast'
import userAuthStore from '../store/authStore';
function useLogOut() {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = userAuthStore(state => state.logout);
    const handleLogout = async () => {

        try {
            await signOut();
            showToast("Success", "You have successfully logged out", "success")
            localStorage.removeItem('user-info');
            logoutUser();
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }



    return { handleLogout, isLoggingOut, error }
}

export default useLogOut