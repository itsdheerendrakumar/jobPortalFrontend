import {create} from "zustand"
interface Profile {
    name: string
    profileImage: string
    role: UserRole
    updateProfile: (name: string, role: UserRole) => void
    logout: () => void,
    updateProfilePicture: (profileImage: string) => void
}
export const useProfileStore = create<Profile>((set) => ({
    name: "",
    profileImage: "",
    role: "",
    updateProfile: (name, role) => set((state) => ({...state, name, role})),
    updateProfilePicture: (profileImage) => set((state) => ({...state, profileImage})),
    logout: () => {
        localStorage.removeItem("accessToken");
        set((state) => ({...state, name: "", profileImage: "", role: ""}))
        window.location.href = "/login";
    }
}))