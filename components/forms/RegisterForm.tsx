"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "@/components/forms/PatientForm";
import { PatientFormDefaultValues } from "@/constants";
import FileUploader from "@/components/FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        identificationDocument: formData,
      };

      // @ts-expect-error to continue
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className={"space-y-4"}>
          <h1 className={"header"}>Welcome 👋</h1>
          <p className={"text-dark-700"}>
            Let us know more about your hospital.
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name={"name"}
          label={"Full name"}
          placeholder={"Enter Your hospital name"}
          iconSrc={"/assets/icons/user.svg"}
          iconAlt={"user"}
        />

        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={"email"}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            iconSrc={"/assets/icons/email.svg"}
            iconAlt={"email"}
          />
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name={"password"}
            label={"Password"}
            placeholder={"Enter your password"}
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name={"phone"}
            label={"Phone Number"}
            placeholder={"+251 9 1031 34065"}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name={"address"}
          label={"Address"}
          placeholder={"Piyasa, Wawel street"}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name={"insurancePolicyNumber"}
          label={"Insurance Policy Number"}
          placeholder={"ABC123456789"}
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name={"identificationDocument"}
          label={"Identification Document"}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
