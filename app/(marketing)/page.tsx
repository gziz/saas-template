/*
This server page is the marketing homepage.
It now also handles the initial auth check and profile creation/check on load for logged-in users.
*/

"use server"

import {
  createProfileAction,
  getProfileByUserIdAction
} from "@/actions/db/profiles-actions" // Added import
import { HeroSection } from "@/components/landing/hero"
import { auth } from "@clerk/nextjs/server" // Added import

// Added async keyword
export default async function HomePage() {
  // Added auth() call and profile logic
  const { userId } = await auth()

  if (userId) {
    const profileRes = await getProfileByUserIdAction(userId)
    if (!profileRes.isSuccess) {
      // Check if the error indicates not found, rather than a DB error
      if (profileRes.message === "Profile not found") {
        console.log(`Profile not found for ${userId}, creating one.`)
        await createProfileAction({ userId })
      } else {
        // Log other potential errors during profile fetch
        console.error(
          `Error fetching profile for ${userId}: ${profileRes.message}`
        )
      }
    }
  }
  // End of added logic

  return (
    <div className="pb-20">
      <HeroSection />
    </div>
  )
}
