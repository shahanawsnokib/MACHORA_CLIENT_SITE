import { createAuthClient } from "better-auth/react"
import { jwtClient, inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
    plugins: [jwtClient(), inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = authClient