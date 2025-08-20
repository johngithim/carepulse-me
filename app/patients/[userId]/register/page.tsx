import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";

export default function Home() {
  return (
    <div className={"flex  h-screen max-h-screen"}>
      <section className={"remove-scrollbar container my-auto"}>
        <div className={"sub-container max-w-[496px]"}>
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt={"patient"}
            className={"mb-12 h-10 w-fit"}
          />

          <PatientForm />
        </div>
      </section>

      <Image
        src={"/assets/images/onboarding-img.png"}
        alt={"patient"}
        height={1000}
        width={1000}
        className={"side-img max-w-[50%]"}
      />
    </div>
  );
}
