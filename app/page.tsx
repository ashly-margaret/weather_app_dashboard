import Image from "next/image";
import logo from "../public/assets/images/logo.svg"

export default function Home() {
  return (
    <div className="min-h-screen p-10 bg-[#02012B] font-sans dark:bg-black">
      <div className="flex items-center justify-between">
        <div>
          <Image src={logo} alt="Logo"  />
        </div>
        <div>
          select box
        </div>

      </div>
      <h1 className="text-center text-white text-4xl font-bold mt-10 ">How's the sky looking today?</h1>
     
    </div>
  );
}
