import Image from "next/image";
import Navbar from "./components/navBar";
import AdminLayout from "./components/adminLayout";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <Navbar /> */}
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
        <h1>
          hello
        </h1>
      {/* </main> */}
    </div>
  );
}
