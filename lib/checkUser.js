import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    // Check if user already exists
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id, // ✅ match Prisma schema
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Create new user
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses?.[0]?.emailAddress ?? "",
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
  }
};
