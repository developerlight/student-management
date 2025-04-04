import Image from "next/image";
import Navbar from "./components/navBar";
import AdminLayout from "./components/adminLayout";
import MainSection from "./components/main";
import About from "./components/about";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <MainSection />
      <About />
    </div>
  );
}
