import { jwt } from "better-auth/plugins/jwt";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("machineRentbd");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.BETTER_AUTH_LOCAL_URL,
  plugins: [jwt({ jwt: { audience: "machora-api", expirationTime: "5m", definePayload: () => ({}) } })],
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path !== "/sign-up/email") return;
      const { password, role } = context.body ?? {};
      if (role !== undefined && role !== "Customer" && role !== "Owner") {
        throw new APIError("BAD_REQUEST", { message: "Choose Customer or Owner when signing up." });
      }
      if (typeof password !== "string" || password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        throw new APIError("BAD_REQUEST", { message: "Use at least six characters with uppercase and lowercase letters." });
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, context) => {
          // Only email signup offers an Owner account. Social signup defaults to Customer.
          const role = context?.path === "/sign-up/email" && user.role === "Owner"
            ? "Owner"
            : "Customer";
          return { data: { role } };
        },
      },
      update: {
        before: async (user) => {
          // Role changes for existing accounts go through the admin API.
          if (user.role !== undefined) {
            throw new APIError("FORBIDDEN", { message: "Only an admin can change an existing account role." });
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      phone: { type: "string", required: false },
      address: { type: "string", required: false },
      role: {
        type: ["Customer", "Owner", "Admin"],
        required: true,
        defaultValue: "Customer",
        input: true,
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});