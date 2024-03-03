import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "Email",
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "password",
                },
            },
            async authorize(credentials) {
                try {
                    const foundUser = await User.findOne({email: credentials.email})
                        .lean()
                        .exec();
                    
                    if (foundUser) {
                        console.log("User exists!");
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            foundUser.password
                        );
                        
                        if (isMatch) {
                            console.log("Matches");
                            
                            delete foundUser.password;
                            foundUser["role"] = "Unverified Email";

                            return foundUser;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }

                return null;
            },
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile);

                let userRole = "Google User";
                
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
            profile(profile) {
                console.log("Profile GitHub: ", profile);

                let userRole = "GitHub User";
                if (profile?.email === "richardyhayashi@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    role: userRole,
                };
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) token.role = user.role;
            
            return token;
        },
        async session({session, token}) {
            if (session?.user) session.user.role = token.role;

            return session;
        },
    },
}