import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId, isLoaded } = useAuth();
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error: any) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("Authentication error. Please login again.");
          }
          console.log("Error fetching token:", error);
        }
        return config;
      },
      (error) => {
        console.error("Axios error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (userId) {
      checkAdminStatus();
      initSocket(userId);
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [isLoaded, userId, checkAdminStatus, initSocket, disconnectSocket]);

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthProvider;
