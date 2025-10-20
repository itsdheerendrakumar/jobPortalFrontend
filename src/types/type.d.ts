interface ILogin {
    email: string
    password: string
}

interface Signup extends ILogin {
    name?: string
    phone?: string
    country?: string
}

interface IAdminUserDetails {
    name: string
    email: string
    phone: string
    country: string
    created: string
    status: "active" | "inactive"
}

interface ApiResponse<T> {
    data: T
    message: string
}

interface LoginData  {
    token: string
}

interface ProfileData {
    name: string
    role: string
    imageUrl: string | null
}

type LoginResponse = ApiResponse<LoginData>
type ProfileResponse = ApiResponse<ProfileData>