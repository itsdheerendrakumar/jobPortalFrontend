import {create} from "zustand"
interface Profile {
    name: string
    profileImage: string
    role: UserRole
    updateProfile: (name: string, profileImage: string, role: UserRole) => void
    logout: () => void
}
export const useProfileStore = create<Profile>((set) => ({
    name: "",
    profileImage: "",
    role: "",
    updateProfile: (name, profileImage, role) => set((state) => ({...state, name, profileImage, role})),
    logout: () => {
        localStorage.removeItem("accessToken");
        set((state) => ({...state, name: "", profileImage: "", role: ""}))
        window.location.href = "/login";
    }
}))