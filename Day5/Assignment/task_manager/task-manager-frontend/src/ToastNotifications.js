import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize toast settings globally
export const showToast = (message, type = "success") => {
    if (type === "success") {
        toast.success(message, { position: "top-right", autoClose: 3000 });
    } else if (type === "error") {
        toast.error(message, { position: "top-right", autoClose: 3000 });
    } else {
        toast.info(message, { position: "top-right", autoClose: 3000 });
    }
};
