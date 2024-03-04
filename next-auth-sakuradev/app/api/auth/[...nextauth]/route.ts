import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "sample@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch((process.env.API_URL as string), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,

                        }),
                    })
                    
                    if (res.ok) {
                        const user = await res.json();
                        if (user) {
                            console.log(user);
                            return user;
                        }
                    } else {
                        console.log(res.statusText);
                    }
                } catch (error) {
                    console.log(error);
                }

                return null;
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;

            return session;
        },
    },
});

export { handler as GET, handler as POST };