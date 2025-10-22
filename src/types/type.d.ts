interface ILogin {
    email: string
    password: string
}

interface ISignup extends ILogin {
    name?: string
    phone?: string
    country?: string
    
}
type UserRole = "superAdmin" | "admin" | "reviewer" | "user" | ""

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
    role: UserRole
    imageUrl: string | null
}

interface MetricsData {
    admin: number
    reviewer: number
    user: number
}
interface AdminReviewerListingData {
  _id: string
  name: string
  email: string
  phone: string
  country: string
  role: string
  deletePermission: boolean
  createdAt: string
  updatedAt: string
}
type LoginResponse = ApiResponse<LoginData>
type ProfileResponse = ApiResponse<ProfileData>
type NewAdminResponse = ApiResponse<{}>
type MetricsResponse = ApiResponse<MetricsData>
type AdminReviewerListingResponse = ApiResponse<IAdminUserDetails[]>