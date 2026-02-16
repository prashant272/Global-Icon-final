import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

console.log("Initializing Passport Google Strategy with Callback:", process.env.GOOGLE_CALLBACK_URL);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Google Auth Callback URL used:", process.env.GOOGLE_CALLBACK_URL);
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // Check if a user with the same email already exists
                    user = await User.findOne({ email: profile.emails[0].value.toLowerCase() });

                    if (user) {
                        // Link existing account
                        user.googleId = profile.id;
                        user.isVerified = true; // Google accounts are verified
                        await user.save();
                    } else {
                        // Create new user
                        user = await User.create({
                            name: profile.displayName,
                            email: profile.emails[0].value.toLowerCase(),
                            googleId: profile.id,
                            isVerified: true,
                            role: "user",
                        });
                    }
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
