import Link from "next/link";

export const metadata = { title: "Privacy | MACHORA" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-5 py-16">
      <h1 className="text-4xl font-bold">Privacy</h1>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Account information</h2>
        <p>MACHORA uses your name, email, and profile image to manage your account. You can edit your profile from your dashboard.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Rentals and payments</h2>
        <p>We save your rental dates, delivery address, and contact details to manage your booking. The equipment owner can see the information needed to fulfill your rental.</p>
        <p>Stripe handles card payments. MACHORA stores the payment status and transaction reference for your booking.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Questions</h2>
        <p>For questions about your information, <Link href="/contact" className="underline">contact MACHORA</Link>.</p>
      </section>
    </main>
  );
}
