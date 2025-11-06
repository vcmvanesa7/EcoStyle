import { toast } from "react-toastify";

export const notification = (
  text: string,
  type: "error" | "success" | "info" | "warning",
  time?: number
) => {
  const config = {
    position: "bottom-center" as const,
    autoClose: time || 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark" as const,
  };

  switch (type) {
    case "success":
      toast.success(text, config);
      break;
    case "error":
      toast.error(text, config);
      break;
    case "info":
      toast.info(text, config);
      break;
    case "warning":
      toast.warning(text, config);
      break;
    default:
      toast(text, config);
  }
};