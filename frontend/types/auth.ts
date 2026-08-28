export interface AuthUser {
id: number;
documentId: string;
username: string;
email: string;
provider: string;
confirmed: boolean;
blocked: boolean;
createdAt: string;
updatedAt: string;
publishedAt: string;
}

export interface LoginResponse {
jwt: string;
user: AuthUser;
}

export interface RegisterResponse {
jwt: string;
refreshToken: string;
user: AuthUser;
}

export interface LoginRequest {
identifier: string;
password: string;
}

export interface RegisterRequest {
username: string;
email: string;
password: string;
}

export interface AuthContextType {
user: AuthUser | null;
isAuthenticated: boolean;
login: (credentials: LoginRequest) => Promise<void>;
register: (data: RegisterRequest) => Promise<void>;
logout: () => void;
}
