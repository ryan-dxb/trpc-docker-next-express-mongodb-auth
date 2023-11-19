import { registerUser } from "@/controllers/authControllers";
import { router, publicProcedure } from "@/lib/trpc";
import { registerUserSchema } from "@/schema/auth.schema";

export const authRouter = router({
  registerUser: publicProcedure
    .input(registerUserSchema)
    .mutation(({ input }) => registerUser({ input })),
});
