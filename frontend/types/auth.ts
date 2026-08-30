export interface AuthRole {
  id: number;
  name: string;
  type: string;
}

export interface AuthUser {
  id: number;
  documentId?: string;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  role?: AuthRole;
}

export interface LoginResponse {
  jwt: string;
  user: AuthUser;
}

export interface RegisterResponse {
  jwt: string;
  refreshToken?: string;
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
  token: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  isAdmin: boolean;
  isInstructor: boolean;
  isStudent: boolean;
  isContentManager: boolean;

  login: (credentials: LoginRequest) => Promise<AuthUser>;
  register: (data: RegisterRequest) => Promise<AuthUser>;
  logout: () => void;
}