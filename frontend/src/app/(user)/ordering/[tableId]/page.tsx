import { UserHero } from "@/components/ordering/user-hero"
import { UserMenu } from "@/components/ordering/user-menu"
import { UserBestsellers } from "@/components/ordering/user-bestsellers"
import UserLayout from "@/components/ordering/layout/layout"

export default function UserHomePage() {
  return (
    <UserLayout>
      <div className="flex flex-col">
        <UserHero />
        <div className="container mx-auto px-4 py-8">
          <UserBestsellers />
          <UserMenu />
        </div>
      </div>
    </UserLayout>
  )
}

