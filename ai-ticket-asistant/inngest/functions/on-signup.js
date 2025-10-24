import { inngest } from "../client.js";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";

export const onUserSignup = inngest.createFunction(
  {
    id: "On-User-Signup",
    retries: 3
  },
  {
    event: "user/signup"
  },
  async ({ event, step }) => {
    try {
      const { email } = event.data;
      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError("User no longer exists in the database");
        }
        return userObject;
      });

      await step.run("send-welcome-email", async () => {
        const subject = "Welcome to the AI Ticketing System!";
        const text = `Hello ${user.email},\n\nThank you for signing up for the AI Ticketing System. We're excited to have you on board!\n\nBest regards,\nThe AI Ticketing System Team`;

        await sendMail(user.email, subject, text);
      });

      return { success: true };
    } catch (error) {
      console.log("Error in On-User-Signup function:", error);
      return { success: false };
    }
  }
);
