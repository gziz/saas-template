import {
  createProfileAction,
  getProfileByUserIdAction
} from "@/actions/db/profiles-actions"
import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"

export async function POST(req: Request) {
  // Get the request body
  const payload = await req.json()
  console.log("payload", payload)

  // Get the headers
  const headersList = await headers()
  const svix_id = headersList.get("svix-id")
  const svix_timestamp = headersList.get("svix-timestamp")
  const svix_signature = headersList.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error: Missing svix headers", { status: 400 })
  }

  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  // If there's no webhook secret, error out
  if (!WEBHOOK_SECRET) {
    return new NextResponse("Error: Missing webhook secret", { status: 500 })
  }

  // Create a new Svix instance with the webhook secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new NextResponse("Error verifying webhook", { status: 400 })
  }

  // Get the event type
  const eventType = evt.type
  console.log("eventType", eventType)
  // Process the event based on type
  if (eventType === "user.created" || eventType === "user.updated") {
    // Get the user data from the payload
    const { id } = evt.data

    // Check if this user already exists in our database
    const { isSuccess } = await getProfileByUserIdAction(id)

    if (!isSuccess) {
      // If the user doesn't exist, create a new profile
      console.log(`Creating new profile for Clerk user ID: ${id}`)
      await createProfileAction({ userId: id })
    } else if (eventType === "user.updated") {
      // If user exists and this is an update event, we could update the profile here
      // Not implemented since we don't have user-specific fields to update yet
      console.log(`User ${id} updated in Clerk, no action needed in our DB`)
    }
  } else if (eventType === "user.deleted") {
    // Handle user deletion if needed
    // We're not deleting the user from our database since we might want to keep their data
    console.log(
      `User ${evt.data.id} deleted in Clerk, no action taken in our DB`
    )
  }

  // Return a 200 response
  return NextResponse.json({ success: true })
}
