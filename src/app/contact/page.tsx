"use client";

import { showToast } from "@/lib/toast";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  PageIntro,
  SectionHeading,
} from "@/components/marketplace-ui";

const contactOptions = [
  {
    icon: Mail,
    title: "Email",
    detail: "hello@machora.com",
    href: "mailto:hello@machora.com",
  },
  {
    icon: Phone,
    title: "Call",
    detail: "+880 1700-000000",
    href: "tel:+8801700000000",
  },
  {
    icon: MapPin,
    title: "Based in",
    detail: "Dhaka, Bangladesh",
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageIntro
        eyebrow="Contact"
        title="We’re here to help you keep work moving."
        description="Have a question about MACHORA, a listing, or a rental? Reach out and our team will point you in the right direction."
      >
        <a
          href="mailto:hello@machora.com"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#c8e889] px-5 text-sm font-bold text-[#1c281e] transition-colors hover:bg-[#d7f39d]"
        >
          <MessageCircle size={16} />
          Email our team
        </a>
      </PageIntro>

      <section className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title="A real person is ready to help."
            description="Choose the contact option that works best for you. For equipment questions, include the listing name and your location."
          />
          <div className="space-y-3">
            {contactOptions.map(({ icon: Icon, title, detail, href }) => {
              const content = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#c8e889]/10 text-[#c8e889]">
                    <Icon size={19} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-[#879489]">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[#e2e8de]">
                      {detail}
                    </span>
                  </span>
                </>
              );

              return href ? (
                <a
                  key={title}
                  href={href}
                  className="flex items-center gap-4 rounded-[18px] border border-white/[0.08] bg-[#19211c] p-4 transition-colors hover:border-[#c8e889]/25"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={title}
                  className="flex items-center gap-4 rounded-[18px] border border-white/[0.08] bg-[#19211c] p-4"
                >
                  {content}
                </div>
              );
            })}
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-[#879489]">
            <Clock3 size={14} className="text-[#c8e889]" />
            Support hours: Sunday–Thursday, 9:00 AM–6:00 PM
          </p>
        </div>

        <div className="rounded-[26px] border border-white/[0.08] bg-[#19211c] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[#f0f2ec]">
            Send us a message
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#9eaa9f]">
            This form opens your email app with your message ready to send.
          </p>
          <form
            onSubmit={() => showToast("Opening your email app…", "info")}
            action="mailto:hello@machora.com"
            method="post"
            encType="text/plain"
            className="mt-6 space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-semibold text-[#cbd4c8]"
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="Name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Name"
                  className="h-12 w-full rounded-xl border border-white/[0.1] bg-[#111713]/70 px-3.5 text-sm text-[#f0f2ec] outline-none placeholder:text-[#68756b] focus:border-[#c8e889]/50"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-semibold text-[#cbd4c8]"
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="Email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-white/[0.1] bg-[#111713]/70 px-3.5 text-sm text-[#f0f2ec] outline-none placeholder:text-[#68756b] focus:border-[#c8e889]/50"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-xs font-semibold text-[#cbd4c8]"
              >
                What can we help with?
              </label>
              <select
                id="contact-subject"
                name="Topic"
                defaultValue="General question"
                className="h-12 w-full rounded-xl border border-white/[0.1] bg-[#111713]/70 px-3.5 text-sm text-[#e2e8de] outline-none focus:border-[#c8e889]/50"
              >
                <option>General question</option>
                <option>Equipment listing</option>
                <option>Rental support</option>
                <option>Feedback</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-xs font-semibold text-[#cbd4c8]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="Message"
                required
                rows={5}
                placeholder="Tell us a little about what you need."
                className="w-full resize-y rounded-xl border border-white/[0.1] bg-[#111713]/70 px-3.5 py-3 text-sm text-[#f0f2ec] outline-none placeholder:text-[#68756b] focus:border-[#c8e889]/50"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c8e889] px-5 text-sm font-bold text-[#1c281e] transition-colors hover:bg-[#d7f39d]"
            >
              Open email app
              <MessageCircle size={16} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}