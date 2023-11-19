import UserModel, { UserDocument } from "@/models/user.model";
import { RegisterUserInput } from "@/schema/auth.schema";
import { omit } from "lodash";

const excludeFields = ["-password -__v"];

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email: email.toLowerCase() });
};

export const createNewUser = async (
  input: RegisterUserInput
): Promise<Partial<UserDocument>> => {
  const { name, email, password } = input;

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  return omit(user.toJSON(), excludeFields);
};
