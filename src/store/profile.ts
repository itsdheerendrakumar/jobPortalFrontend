import {create} from "zustand"
interface Profile {
    name: string
    profileImage: string
    role: string
    updateProfile: (name: string, profileImage: string, role: string) => void
}
export const useProfileStore = create<Profile>((set) => ({
    name: "",
    profileImage: "",
    role: "",
    updateProfile: (name, profileImage, role) => set((state) => ({...state, name, profileImage, role}))
}))