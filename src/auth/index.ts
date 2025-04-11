import Credentials from "next-auth/providers/credentials";
import NextAuth { User, NextAuthConfig } from "next-auth";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                const users = [
                    {
                        id: "test-user-1",
                        userName: "test1",
                        name: "Test 1",
                        password: "pass",
                        email: "test1@donotreply.com"
                    },
                    {
                        id: "test-user-2",
                        userName: "test2",
                        name: "Test 2",
                        password: "pass",
                        email: "test2@donotreply.com"
                    }
                ];
                const user = users.find(
                    (user) =>
                        user userName === credentials?.username &&
                        user.password === credentials?.password
                )
        },
    })
    ],
    basePath: BASE_PATH,
    secret: process, env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);