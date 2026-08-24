import type { Metadata } from "next"

import ProfileView from "@/uicomps/ProfileView"

export const metadata: Metadata = {
    title: "Your profile",
    description: "Your details, your bag and the products you have added.",
}

export default function ProfilePage() {
    return <ProfileView />
}
