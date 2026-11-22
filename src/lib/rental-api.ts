import { authClient } from "./auth-client";

export type Equipment = {
  _id: string; name: string; description: string; category: string; location: string;
  price: number; rentalType: string; quantity: number; condition: string; brand: string;
  model: string; image: string; terms: string; status: string; ownerName: string;
};

export async function rentalApi<T>(path: string, options: RequestInit = {}, privateRoute = false): Promise<T> {
  const requestHeaders = new Headers(options.headers);
  if (options.body) requestHeaders.set("Content-Type", "application/json");
  if (privateRoute) {
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("Please sign in again.");
    requestHeaders.set("Authorization", "Bearer " + data.token);
  }
  const response = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + path, { ...options, headers: requestHeaders });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "The request failed.");
  return data as T;
}
