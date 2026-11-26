import { getAuth } from "@/lib/auth";

async function handleAuthRequest(request: Request) {
  const auth = await getAuth();
  return auth.handler(request);
}

export const GET = handleAuthRequest;
export const POST = handleAuthRequest;
