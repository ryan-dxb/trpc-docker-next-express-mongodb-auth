import jwt, { SignOptions } from "jsonwebtoken";

export const signJWT = (
  payload: Object,
  key: "ACCESS_JWT_SECRET" | "REFRESH_JWT_SECRET",
  options: SignOptions = {}
) => {
  // const privateKey = Buffer.from(process.env[key]!, "base64").toString("utf-8");

  const privateKey = process.env[key]! as string;

  console.log("privateKey", privateKey);

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "HS256",
  });
};

export const verifyJWT = <T>(
  token: string,
  key: "ACCESS_JWT_SECRET" | "REFRESH_JWT_SECRET"
): T | null => {
  try {
    const publicKey = Buffer.from(process.env[key]!, "base64").toString(
      "ascii"
    );

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["HS256"],
    });

    return decoded as T;
  } catch (error) {
    console.log(error);
    return null;
  }
};
