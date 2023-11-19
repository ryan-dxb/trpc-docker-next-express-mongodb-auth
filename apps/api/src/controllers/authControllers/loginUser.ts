import { LoginUserInput } from "@/schema/auth.schema";
import { excludeFields, findUserByEmail } from "@/services/user.service";
import { TRPCError } from "@trpc/server";
import { omit } from "lodash";

const loginUserController = async ({ input }: { input: LoginUserInput }) => {
  try {
    const { email, password } = input;

    // Check if user exists
    const userExists = await findUserByEmail(email);

    console.log(userExists);

    if (!userExists) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid credentials",
      });
    }

    // Check if password matches
    const passwordMatches = await userExists.comparePassword(password);

    if (!passwordMatches) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid credentials",
      });
    }

    return {
      status: "success",
      message: "User logged in successfully",
      data: { user: userExists },
    };
  } catch (error) {
    throw error;
  }
};

export default loginUserController;
