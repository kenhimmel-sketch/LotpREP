import SignupForm from "../SignupForm";
import { Toaster } from "@/components/ui/toaster";

export default function SignupFormExample() {
  return (
    <>
      <div className="p-8 max-w-2xl">
        <SignupForm teamId="avengers" teamName="Acacia Park Avengers" />
      </div>
      <Toaster />
    </>
  );
}
