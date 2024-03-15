import { useState } from "react"
import useShowToast from "./useShowToast";


function usePreviewingImg() {
    const [selectedFile, setSeletedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "File size must bt less than 2MB", "error");
                setSeletedFile(null)
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSeletedFile(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            setSeletedFile(null);
            showToast("Error", "Please select an image", "error");
        }
    }

    return {
        selectedFile,
        handleImageChange,
        setSeletedFile
    }
}

export default usePreviewingImg