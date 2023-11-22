"use client";
import { NextPage } from "next";
import { Button } from "ui";
import { trpc } from "@/trpc";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const { data } = trpc.user.getMe.useQuery();

  console.log(data);

  return (
    <div className="w-full h-screen">
      <Button>Click me</Button>
    </div>
  );
};

export default Home;
