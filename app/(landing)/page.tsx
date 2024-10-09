import Image from "next/image";
import AuthForm from "../components/AuthForm";

const Page = () => {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/background.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="text-6xl relative z-10 flex justify-center items-center h-full flex-col ">
        <Image src="/logo.jpeg" width={200} height={200} alt="Logo" />
        <AuthForm />
      </div>
    </div>
  );
};

export default Page;
