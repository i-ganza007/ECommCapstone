import CartIndicator from "@/uicomps/CartIndicator"
import NavBar from "@/uicomps/Navbar"

// Chrome shared by every signed-in route. This is a route group, so it adds no
// URL segment — it only decides which pages get the nav and the page gradient.
// Routes outside the group (e.g. /login) render on the bare document shell.
export default function NonAuthRoutesLayout({ children }: { children: React.ReactNode }) {
  return (
    // The gradient lives on this wrapper, not <body> — a body background is
    // propagated to the canvas and tiles once the page scrolls past 100vh.
    <div className="flex min-h-screen w-full flex-col bg-linear-to-b/oklab from-[#6E0B0B] from-5% via-[#D8400A] via-45% to-[#F3B45E] px-10 py-6">
      <NavBar />
      {children}

      {/* Position:fixed, so it is outside this flow — it just needs to be mounted
          on every storefront route. */}
      <CartIndicator />
    </div>
  )
}
