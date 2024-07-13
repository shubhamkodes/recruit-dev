import NotFound from "@components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page | TalentConnect",
};

const ErrorPage = () => {
  return (
    <>
        <NotFound />
    </>
  );
};

export default ErrorPage;
