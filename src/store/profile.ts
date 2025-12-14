import {create} from "zustand"
interface Profile {
    name: string
    profileImage: string
    role: UserRole,
    id: string
    resumePublicId?: string
    updateProfile: (name: string, role: UserRole, id: string, resumePublicId?: string) => void
    logout: () => void,
    updateProfilePicture: (profileImage: string) => void
}
export const useProfileStore = create<Profile>((set) => ({
    name: "",
    profileImage: "",
    role: "",
    id: "",
    updateProfile: (name, role, resumePublicId, id) => set((state) => (
        {...state, name, role, id, ...(role === "user" && {resumePublicId})}
    )),
    updateProfilePicture: (profileImage) => set((state) => ({...state, profileImage})),
    logout: () => {
        localStorage.removeItem("accessToken");
        set((state) => ({...state, name: "", profileImage: "", role: ""}))
        window.location.href = "/login";
    }
}))