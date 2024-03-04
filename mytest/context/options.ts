import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
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
            async authorize(credentials, req) {
                if (credentials && credentials?.email && credentials.password ) {
                    try {
                        const user = { id: '69', hane: "Joe", email: credentials?.email }

                        if (user) {
                            return user;
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({  }) {

        }
    }
};