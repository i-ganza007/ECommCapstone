import CartIndicator from "@/uicomps/CartIndicator"
import NavBar from "@/uicomps/Navbar"

export default function NonAuthRoutesLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <div className="flex min-h-screen w-full flex-col bg-linear-to-b/oklab from-[#6E0B0B] from-5% via-[#D8400A] via-45% to-[#F3B45E] px-10 py-6">
      <NavBar />
      {children}

      <CartIndicator />
    </div>
  )
}
