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
    deadline
    _id: string
}
interface JobDetailData extends JobListingData {
  category: string;
  description: string;
  education: string;
  skills: string;
}

interface AdminAppliedJobListingData {
    createdAt: string
    _id: string
    jobId: {
        jobTitle: string
        category: string
        deadline: string
    },
    userId: {
        name: string
    }
}
interface UserSelectData {
    label: string
    value: string
}

type TableData = (string | number)[][]

interface AssignReviewerPayload {
    docId: string
    reviewerId: string
}

interface AssignedJobData {
   appliedDates: string[]
   documentIds: string[]
   applicantDetail: {name: string, status: "active" | "inactive", createdAt: string, _id: string}[]
   jobDetails: {
    _id: string
    jobTitle: string
    companyName: string
    education: string
    experience: number;
    skills: string
  }[]
  _id: string
  jobId: {
    _id: string
    jobTitle: string
    companyName: string
    education: string
    experience: number;
    skills: string
  }
//   userId: {
//     _id: string
//     name: string
//     education: string[]
//   }
  createdAt: string
}
interface ReviewerResponseToAssignedJobPayload {
    docId: string
    reviewerStatus: "selected" | "rejected"
    reason: string
}
interface ReviewedApplicationData {
  _id: string;
  reason: string;

  reviewerDetail: {
    name: string;
    email: string;
  };

  applicantDetail: {
    _id: string;
    name: string;
  };

  jobDetails: {
    companyName: string;
    jobTitle: string;
    jobId: string;
  };
}


type EducationKeys = "name" | "collegeName" | "percentage" | "passYear"
type LoginResponse = ApiResponse<LoginData>
type ProfileResponse = ApiResponse<ProfileData>
type NewAdminResponse = ApiResponse<{}>
type MetricsResponse = ApiResponse<MetricsData>
type AdminReviewerListingResponse = ApiResponse<IAdminUserDetails[]>
type EmptyDataResponse = ApiResponse<{}>
type JobListingResponse = ApiResponse<JobListingData[]>
type JobDetailResponse = ApiResponse<JobDetailData>
type AdminAppliedJobListing = ApiResponse<AdminAppliedJobListingData[]>
type UserSelectDataResponse = ApiResponse<UserSelectData[]>
type AssignedJobResponse = ApiResponse<AssignedJobData[]>
type EducationResponse = ApiResponse<Record<EducationKeys, "string">[]>
type ReviewedApplicationResponse = ApiResponse<ReviewedApplicationData[]>