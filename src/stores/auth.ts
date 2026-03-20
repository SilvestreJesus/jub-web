

export interface VerifyDTO {
    access_token: string;
    username: string;
    secret: string;
}
export interface LogoutDTO{
    access_token: string;
    username: string;
}

export interface AuthAttemptDTO {
    username: string;
    password: string;
    scope: string;
    expiration: string;
    renew_token: boolean;
}

export interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_photo: string;
    role?: string;
}

export interface AuthResponseDTO{
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_photo: string;
    access_token: string;
    temporal_secret: string;
    metadata: Record<string, any>;
    role?: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const isVerified = ref(false);
    const showAuthDialog = ref(false);
    const pendingRedirect = ref<string | null>(null);

    const XOLO_API_URL = import.meta.env.VITE_XOLO_API_URL || 'http://localhost:10000/api/v4';

    function clearLocalStorage() {
        localStorage.removeItem("token");
        localStorage.removeItem("secret");
        localStorage.removeItem("username");
    }
    async function verifyToken(data: VerifyDTO) {
        isLoading.value  = true;
        error.value      = null;
        isVerified.value = false;
        
        try {
            const response = await fetch(`${XOLO_API_URL}/users/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            console.log("Verification response status:", response.status);

            if (response.ok) {
                isVerified.value = true;
            } else {
                isVerified.value = false;

                const errorData = await response.json();
                console.error("Verification failed:", errorData);
                error.value = errorData.message || "Failed to verify token.";
                return isVerified.value;
                // throw new Error("Failed to verify token.");
            }


        } catch (err:any) {
            isVerified.value = false;
            error.value = err.message || "An error occurred during verification.";
        } finally {
            isLoading.value = false;
        }

        return isVerified.value;
    }

    function getUser(): User | null {
        return user.value;
    }
    async function login(payload: AuthAttemptDTO) {      
        // Implement login logic here
        try {
            const response = await fetch(`${XOLO_API_URL}/users/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            console.log("Login response status:", response.status);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Login failed:", errorData);
                throw new Error("Failed to login.");
            }
            const data = await response.json() as AuthResponseDTO;
            // Simulate successful login
            localStorage.setItem("username", payload.username);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("secret", data.temporal_secret);
            
            user.value = {
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                profile_photo: `https://api.dicebear.com/9.x/bottts/svg?seed=${data.first_name}`,
                role: data.role
            };
            isVerified.value = true;
            return true;
        } catch (err) {
            console.error("Login error:", err);
            error.value = "An error occurred during login.";
            return false;
        }finally{
            isLoading.value = false;
        }
    
    }
    async function logout(){
        const payload: LogoutDTO = {  
            access_token: localStorage.getItem("token") || "",
            username: localStorage.getItem("username") || ""
        }
        try {
            isLoading.value = true;
            error.value = null;
            await fetch(`${XOLO_API_URL}/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            return true;
        } catch (err) {
            console.error("Logout error:", err);
            error.value = "An error occurred during logout.";
            return false;
        } finally {
            // localStorage.removeItem("access_token");
            localStorage.removeItem("token");
            localStorage.removeItem("secret");
            localStorage.removeItem("username");
            localStorage.removeItem("mictlanx-store");
            user.value = null;
            isVerified.value = false;
            isLoading.value = false;
        }

    }

    return {
        user,
        isLoading,
        error,
        isVerified,
        showAuthDialog,
        pendingRedirect,
        getUser,
        verifyToken,
        login,
        logout,
        clearLocalStorage
    }

},{
    persist:true
})