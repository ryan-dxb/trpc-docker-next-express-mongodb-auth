import {
  loginUser,
  refreshToken,
  registerUser,
} from "@/controllers/authControllers";
import { router, publicProcedure } from "@/lib/trpc";
import { loginUserSchema, registerUserSchema } from "@/schema/auth.schema";

export const authRouter = router({
  registerUser: publicProcedure
    .input(registerUserSchema)
    .mutation(({ input }) => registerUser({ input })),

  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input, ctx }) => loginUser({ input, ctx })),

  refreshToken: publicProcedure.mutation(({ ctx }) => refreshToken({ ctx })),
});
