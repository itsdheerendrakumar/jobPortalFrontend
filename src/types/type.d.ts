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
    _id: string
    name: string
    email: string
    phone: string
    country: string
    createdAt: string
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

interface UpdateAdminStatusPayload {
    status: "active" | "inactive"
    adminId: string
}
interface JobListingData {
    companyName: string
    createdAt: string 
    experience: number 
    jobTitle: string
    jobType: string
    location: string
    minSalary: number
    maxSalary: number
    createdBy: string,
    vacancy: number
    _id: string
}

type LoginResponse = ApiResponse<LoginData>
type ProfileResponse = ApiResponse<ProfileData>
type NewAdminResponse = ApiResponse<{}>
type MetricsResponse = ApiResponse<MetricsData>
type AdminReviewerListingResponse = ApiResponse<IAdminUserDetails[]>
type EmptyDataResponse = ApiResponse<{}>
type JobListingResponse = ApiResponse<JobListingData[]>