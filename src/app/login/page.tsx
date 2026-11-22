"use client";

import { showToast } from "@/lib/toast";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";

type SocialProvider = "google" | "github";
type PendingAction = "email" | SocialProvider | null;

export default function LoginPage() {
  const router = useRouter();

  // Keep the user's email and password available for the sign-in request.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Track which button is busy, whether the password is visible, and any error.
  const [showPassword, setShowPassword] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [errorMessage, setErrorMessage] = useState("");

  function reportError(message: string) {
    setErrorMessage(message);
    showToast(message, "error");
  }

  function signedInPath() {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next === "/dashboard/owner#equipment-form") {
      return "/dashboard/owner?auth=signed-in#equipment-form";
    }
    const path = next && /^\/(?:dashboard(?:\/(?:admin|owner|customer))?|profile|browse_equipment\/[a-f0-9]{24}(?:\?book=1)?)$/i.test(next) ? next : "/";
    const destination = new URL(path, window.location.origin);
    destination.searchParams.set("auth", "signed-in");
    return destination.pathname + destination.search;
  }

  // Submit email and password to Better Auth.
  async function handleEmailSignIn(event: FormEvent<HTMLFormElement>) {
    // Prevent a full browser reload so we can handle the result here.
    event.preventDefault();
    setErrorMessage("");
    setPendingAction("email");

    try {
      // Ask Better Auth to sign in and return to the home page on success.
      const result = await signIn.email({
        email,
        password,
        callbackURL: signedInPath(),
      });

      // Keep the user on this page and show a useful message if sign-in fails.
      if (result.error) {
        reportError(result.error.message || "Unable to sign in. Please try again.");
        return;
      }

      // Replace the login page with the home page after successful sign-in.
      router.replace(signedInPath());
      router.refresh();
    } catch (error) {
      reportError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  // Start Google or GitHub sign-in. Better Auth handles the provider redirect.
  async function handleSocialSignIn(provider: SocialProvider) {
    setErrorMessage("");
    setPendingAction(provider);

    try {
      const result = await signIn.social({
        provider,
        callbackURL: signedInPath(),
      });

      if (result.error) {
        reportError(
          result.error.message || `Unable to sign in with ${provider}.`,
        );
      }
    } catch (error) {
      reportError(
        error instanceof Error
          ? error.message
          : `Unable to sign in with ${provider}.`,
      );
    } finally {
      setPendingAction(null);
    }
  }

  const isPending = pendingAction !== null;

  return (
    <main className="flex flex-1 items-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#171f1a] shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:rounded-[34px] lg:grid lg:grid-cols-[1fr_0.88fr]">
        <section className="relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden p-7 sm:min-h-[360px] sm:p-10 lg:min-h-[650px] lg:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1400&q=85")',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,19,0.5)_0%,rgba(17,24,19,0.25)_35%,rgba(17,24,19,0.94)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,24,19,0.35),transparent)]"
          />

          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#e5efdb] backdrop-blur-md sm:w-fit sm:text-[11px]">
            <ShieldCheck size={15} className="text-[#c8e889]" />
            A trusted equipment network
          </div>

          <div className="mt-12 max-w-[450px]">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d0eb9c] sm:text-[11px]">
              Welcome back to MACHORA
            </p>
            <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#f4f6ef] sm:text-[52px]">
              Your next
              <br />
              project starts
              <br />
              <span className="text-[#c8e889]">right here.</span>
            </h1>
            <p className="mt-5 max-w-[380px] text-sm leading-6 text-[#d0d9ce] sm:text-[15px]">
              Sign in to find the equipment you need or manage the gear you
              share with your community.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-12">
          <div className="w-full max-w-[380px]">
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889]">
                Your account
              </p>
              <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.045em] text-[#f0f2ec] sm:text-[34px]">
                Sign in
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#9eaa9f]">
                Welcome back. Enter your details to continue.
              </p>
              <Link
                href="/login?next=%2Fdashboard%2Fowner%23equipment-form#email"
                className="mt-4 inline-flex rounded-lg border border-[#c8e889]/30 px-3 py-2 text-sm font-semibold text-[#c8e889] hover:bg-[#c8e889]/10"
              >
                Owner sign-in
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => handleSocialSignIn("google")}
                className="h-12 gap-2 rounded-xl border-white/[0.12] bg-white/[0.035] px-3 text-[13px] font-semibold text-[#e9eee4] hover:bg-white/[0.08] hover:text-white"
              >
                {pendingAction === "google" ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <GoogleMark />
                )}
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => handleSocialSignIn("github")}
                className="h-12 gap-2 rounded-xl border-white/[0.12] bg-white/[0.035] px-3 text-[13px] font-semibold text-[#e9eee4] hover:bg-white/[0.08] hover:text-white"
              >
                {pendingAction === "github" ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <GitHubMark />
                )}
                GitHub
              </Button>
            </div>

            <FieldSeparator className="my-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#748176]">
              or continue with email
            </FieldSeparator>



            {/* // email signin  */}


            

            <form onSubmit={handleEmailSignIn}>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel
                    htmlFor="email"
                    className="mb-2 text-xs font-semibold text-[#cbd4c8]"
                  >
                    Email address
                  </FieldLabel>
                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78867b]"
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      disabled={isPending}
                      className="h-12 rounded-xl border-white/[0.1] bg-[#111713]/70 pl-10 text-sm text-[#f0f2ec] placeholder:text-[#68756b] focus-visible:border-[#c8e889]/50 focus-visible:ring-[#c8e889]/20"
                    />
                  </div>
                </Field>

                <Field>
                  <div className="mb-2 flex items-center justify-between">
                    <FieldLabel
                      htmlFor="password"
                      className="text-xs font-semibold text-[#cbd4c8]"
                    >
                      Password
                    </FieldLabel>
                  </div>
                  <div className="relative">
                    <LockKeyhole
                      aria-hidden="true"
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78867b]"
                    />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      disabled={isPending}
                      className="h-12 rounded-xl border-white/[0.1] bg-[#111713]/70 pl-10 pr-12 text-sm text-[#f0f2ec] placeholder:text-[#68756b] focus-visible:border-[#c8e889]/50 focus-visible:ring-[#c8e889]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#89978b] transition-colors hover:text-[#e8eee3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8e889]/50"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>
              </FieldGroup>

              {errorMessage && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.07] px-3.5 py-3 text-xs leading-5 text-red-200"
                >
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="mt-6 h-12 w-full justify-between rounded-xl bg-[#c8e889] px-4 text-sm font-bold text-[#1c281e] hover:bg-[#d7f39d]"
              >
                <span className="flex items-center gap-2">
                  {pendingAction === "email" && (
                    <LoaderCircle size={16} className="animate-spin" />
                  )}
                  Sign in to your account
                </span>
                <ArrowRight size={17} />
              </Button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-[#849186]">
              New to MACHORA?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-[#c8e889] underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="size-[17px]"
      focusable="false"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
        transform="translate(0 6)"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.27 5.48-4.76 7.18l7.73 6C44.42 38.05 46.98 31.95 46.98 24.55Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px]"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.23v3.31c0 .32.22.48.82.58A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}
