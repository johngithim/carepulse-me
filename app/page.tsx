import React from "react";
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";

const Register = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const user = await getUser(userId);
  const isAdmin = searchParams.admin === "true";

  return (
    <div className={"flex  h-screen max-h-screen"}>
      {isAdmin && <PasskeyModal />}
      <section className={"remove-scrollbar container "}>
        <div className={"sub-container max-w-[860px] flex-1 flex-col py-10"}>
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt={"patient"}
            className={"mb-12 h-10 w-fit"}
          />

          <RegisterForm user={user} />

          <div className={"text-14-regular mt-20 flex justify-between py-12"}>
            <p className={"justify-items-end text-dark-600 xl:text-left"}>
              ©copyright carepulse
            </p>
            <Link href={"/?admin=true"} className={"text-green-500"}>
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src={"/assets/images/register-img.png"}
        alt={"patient"}
        height={1000}
        width={1000}
        className={"side-img max-w-[390px]"}
      />
    </div>
  );
};
export default Register;
