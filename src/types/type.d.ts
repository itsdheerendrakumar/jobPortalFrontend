interface Login {
    email: string
    password: string
}

interface Signup extends Login {
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
