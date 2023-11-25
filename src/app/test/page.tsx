import { db } from "@/lib/db";
import TestForm from "./test-form";

const Page = async () => {
  const count = (await db.test.findFirst().then((res) => res?.count)) || 0;

  return <TestForm count={count} />;
};

export default Page;
