import { apiRequest } from "./api";
import type {
AuthUser,
LoginRequest,
LoginResponse,
RegisterRequest,
RegisterResponse,
} from "@/types/auth";

export async function register(
data: RegisterRequest
): Promise<RegisterResponse> {
return apiRequest<RegisterResponse>("/auth/local/register", {
method: "POST",
body: JSON.stringify(data),
});
}

export async function login(
credentials: LoginRequest
): Promise<LoginResponse> {
return apiRequest<LoginResponse>("/auth/local", {
method: "POST",
body: JSON.stringify(credentials),
});
}

export async function getCurrentUser(
token: string
): Promise<AuthUser> {
return apiRequest<AuthUser>("/users/me", {
method: "GET",
token,
});
}
