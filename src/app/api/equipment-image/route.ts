import { getAuth } from "@/lib/auth";

export async function POST(request: Request) {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ message: "Please sign in." }, { status: 401 });
  if (!["Owner", "Admin"].includes(session.user.role || "")) {
    return Response.json({ message: "Access denied." }, { status: 403 });
  }
  const key = process.env.IMGBB_API_KEY;
  if (!key) return Response.json({ message: "Add IMGBB_API_KEY or enter an image URL." }, { status: 503 });
  const image = (await request.formData()).get("image");
  if (!(image instanceof File) || !["image/jpeg", "image/png", "image/webp"].includes(image.type) || image.size > 5000000) {
    return Response.json({ message: "Upload a JPG, PNG, or WebP file under 5 MB." }, { status: 400 });
  }
  const data = new FormData();
  data.set("image", image);
  const url = new URL("https://api.imgbb.com/1/upload");
  url.searchParams.set("key", key);
  try {
    const result = await fetch(url, { method: "POST", body: data, signal: AbortSignal.timeout(10000) });
    const upload = await result.json();
    if (!result.ok || !upload.data?.url) throw new Error();
    return Response.json({ url: upload.data.url });
  } catch {
    return Response.json({ message: "ImgBB could not upload the photo." }, { status: 502 });
  }
}
