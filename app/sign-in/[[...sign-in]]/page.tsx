import { SignIn } from "@clerk/nextjs";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex items-center flex-1 justify-center py-35">
        <SignIn />
      </div>
      <Footer />
    </div>
  );
}
