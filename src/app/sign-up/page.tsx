"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ImagePlus,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  // Keep each form value in state so validation and sign-up can read it.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // These values control the password button, submit button, and error message.
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Runs when the user submits the registration form.
  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    // Keep the browser from reloading the page; React handles the form instead.
    event.preventDefault();
    setErrorMessage("");

    // Check the fields before sending them to the authentication service.
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (password.length < 6 || !hasUppercase || !hasLowercase) {
      setErrorMessage(
        "Use at least 6 characters, including an uppercase and a lowercase letter.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Your passwords do not match.");
      return;
    }

    // Disable the button while Better Auth is processing the request.
    setIsPending(true);

    try {
      // Send the registration details. The profile image is optional.
      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
        callbackURL: "/",
      });

      // Show the authentication service's error without leaving the form.
      if (result.error) {
        setErrorMessage(
          result.error.message ||
            "Unable to create your account. Please try again.",
        );
        return;
      }

      // The account was created, so send the user to the home page.
      router.replace("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setIsPending(false);
    }

  }

  return (
    <main className="flex flex-1 items-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#171f1a] shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:rounded-[34px] lg:grid lg:grid-cols-[1fr_0.88fr]">
        <section className="relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden p-7 sm:min-h-[360px] sm:p-10 lg:min-h-[700px] lg:p-12">
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
              Join the MACHORA community
            </p>
            <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#f4f6ef] sm:text-[52px]">
              Make room
              <br />
              for your next
              <br />
              <span className="text-[#c8e889]">big project.</span>
            </h1>
            <p className="mt-5 max-w-[380px] text-sm leading-6 text-[#d0d9ce] sm:text-[15px]">
              Create an account to find dependable equipment or put your own
              machines to work.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-12">
          <div className="w-full max-w-[380px]">
            <div className="mb-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889]">
                Get started
              </p>
              <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.045em] text-[#f0f2ec] sm:text-[34px]">
                Create your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#9eaa9f]">
                Join renters and equipment owners across Bangladesh.
              </p>
            </div>

            <form onSubmit={handleSignUp} autoComplete="on">
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel
                    htmlFor="name"
                    className="mb-2 text-xs font-semibold text-[#cbd4c8]"
                  >
                    Full name
                  </FieldLabel>
                  <div className="relative">
                    <UserRound
                      aria-hidden="true"
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78867b]"
                    />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      disabled={isPending}
                      className="h-12 rounded-xl border-white/[0.1] bg-[#111713]/70 pl-10 text-sm text-[#f0f2ec] placeholder:text-[#68756b] focus-visible:border-[#c8e889]/50 focus-visible:ring-[#c8e889]/20"
                    />
                  </div>
                </Field>

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
                  <FieldLabel
                    htmlFor="image"
                    className="mb-2 text-xs font-semibold text-[#cbd4c8]"
                  >
                    Profile image URL{" "}
                    <span className="font-normal text-[#78867b]">(optional)</span>
                  </FieldLabel>
                  <div className="relative">
                    <ImagePlus
                      aria-hidden="true"
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78867b]"
                    />
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      autoComplete="url"
                      placeholder="https://example.com/photo.jpg"
                      value={image}
                      onChange={(event) => setImage(event.target.value)}
                      disabled={isPending}
                      className="h-12 rounded-xl border-white/[0.1] bg-[#111713]/70 pl-10 text-sm text-[#f0f2ec] placeholder:text-[#68756b] focus-visible:border-[#c8e889]/50 focus-visible:ring-[#c8e889]/20"
                    />
                  </div>
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="password"
                    className="mb-2 text-xs font-semibold text-[#cbd4c8]"
                  >
                    Password
                  </FieldLabel>
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
                      autoComplete="new-password"
                      placeholder="Create a password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      disabled={isPending}
                      className="h-12 rounded-xl border-white/[0.1] bg-[#111713]/70 pl-10 pr-12 text-sm text-[#f0f2ec] placeholder:text-[#68756b] focus-visible:border-[#c8e889]/50 focus-visible:ring-[#c8e889]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide passwords" : "Show passwords"}
                      aria-pressed={showPassword}
                      className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#89978b] transition-colors hover:text-[#e8eee3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8e889]/50"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="confirm-password"
                    className="mb-2 text-xs font-semibold text-[#cbd4c8]"
                  >
                    Confirm password
                  </FieldLabel>
                  <div className="relative">
                    <LockKeyhole
                      aria-hidden="true"
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78867b]"
                    />
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter your password again"
                      required
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      disabled={isPending}
                      className="h-12 rounded-xl border-white/[0.1] bg-[#111713]/70 pl-10 text-sm text-[#f0f2ec] placeholder:text-[#68756b] focus-visible:border-[#c8e889]/50 focus-visible:ring-[#c8e889]/20"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] leading-5 text-[#849186]">
                    At least 6 characters with uppercase and lowercase letters.
                  </p>
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
                  {isPending && (
                    <LoaderCircle size={16} className="animate-spin" />
                  )}
                  Create account
                </span>
                <ArrowRight size={17} />
              </Button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-[#9eaa9f]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#c8e889] underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
