import { Context } from "@/lib/trpc";
import { LoginUserInput } from "@/schema/auth.schema";
import { generateTokens } from "@/services/token.service";
import { excludeFields, findUserByEmail } from "@/services/user.service";
import { User } from "@/types";
import { TRPCError } from "@trpc/server";
import { omit } from "lodash";

const loginUserController = async ({
  input,
  ctx,
}: {
  input: LoginUserInput;
  ctx: Context;
}) => {
  try {
    const { email, password } = input;

    // Check if user exists
    const userExists = await findUserByEmail(email);

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

    // Generate Tokens
    const { accessToken, refreshToken } = await generateTokens(userExists);

    console.log("accessToken", accessToken);

    // Send Tokens in cookies
    ctx.res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    ctx.res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    ctx.res.cookie("isLoggedIn", true, {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return {
      status: "success",
      message: "User logged in successfully",
      data: { user: userExists as User },
    };
  } catch (error) {
    throw error;
  }
};

export default loginUserController;
