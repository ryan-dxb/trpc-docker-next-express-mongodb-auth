import { privateProcedure, router } from "@/lib/trpc";

export const userRouter = router({
  getMe: privateProcedure.query(({ ctx }) => {
    console.log(ctx.req);
    return ctx.user;
  }),
});
