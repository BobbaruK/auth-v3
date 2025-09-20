import db from "@/lib/prisma";

export const getUser = async (id: string) => {
  try {
    const user = await db.auth_user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    return null;
  }
};
