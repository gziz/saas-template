/*
The root server layout for the app.
It now only sets up providers and global structure, authentication checks are moved lower down.
*/

// REMOVED: import { auth } from "@clerk/nextjs/server"
// REMOVED: import { createProfileAction, getProfileByUserIdAction } from "@/actions/db/profiles-actions"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/utilities/providers"
import { TailwindIndicator } from "@/components/utilities/tailwind-indicator"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SaaS Template",
  description: "A full-stack SAAS web application template."
}

// REMOVED: async keyword
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // REMOVED: auth() call and profile logic
  // const { userId } = await auth()
  // console.log("userId", userId)
  // if (userId) {
  //   const profileRes = await getProfileByUserIdAction(userId)
  //   if (!profileRes.isSuccess) {
  //     await createProfileAction({ userId })
  //   }
  // }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-background mx-auto min-h-screen w-full scroll-smooth antialiased",
            inter.className
          )}
        >
          <Providers
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}

            <TailwindIndicator />

            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
