import { CiUser } from "react-icons/ci";

export default function AboutMe() {
  return (
    <div className="w-1/3 bg-neutral-200 rounded-md mt-2 p-3 flex flex-col gap-4">
      <section className="text-md font-semibold">About Me</section>
      <div className="flex gap-4 items-center">
        <section>
          <CiUser className="text-7xl rounded-full p-2 bg-blue-200" />
        </section>
        <section className="flex flex-col justify-end gap-2">
          <h1>Utkarsh Patel</h1>
          <p className="text-xs text-neutral-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            optio?
          </p>
        </section>
      </div>
      <InformationSection />
    </div>
  );
}
function InformationSection() {
  return (
    <section className=" m-1 p-2 flex flex-col gap-y-2">
      {Object.keys(INFORMATION).map((key) => (
        <section key={key} className="flex text-sm ">
          <p className="flex-1 text-neutral-600">{key}</p>
          <p className="flex-1">{INFORMATION[key]}</p>
        </section>
      ))}
    </section>
  );
}
