"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as React from "react"; // ← add
import { Eye, EyeOff } from "lucide-react";
import { Control } from "react-hook-form";
import { FormFieldType } from "@/components/forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { E164Number } from "libphonenumber-js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomProps {
  control: Control<any>;
  fieldType?: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const PasswordInput: React.FC<{
  field: any;
  placeholder?: string;
  disabled?: boolean;
}> = ({ field, placeholder, disabled }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        {...field}
        className="shad-input pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="eye-style"
        aria-label={show ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;
  switch (fieldType) {
    case FormFieldType.PASSWORD:
      const { disabled } = props;
      return <PasswordInput field={field} disabled={disabled} />;
    case FormFieldType.INPUT:
      return (
        <div className={"flex rounded-md border border-dark-500 bg-dark-400"}>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className={"ml-2"}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className={"shad-input border-0"}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry={"ET"}
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className={"input-phone"}
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className={"flex rounded-md border border-dark-500 bg-dark-400"}>
          <Image
            src={"/assets/icons/calendar.svg"}
            alt={"calendar"}
            width={24}
            height={24}
            className={"ml-2"}
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel={"Time:"}
              wrapperClassName={"date-picker"}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={"shad-select-trigger"}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={"shad-select-content"}>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          {...field}
          className={"shad-textArea"}
          disabled={props.disabled}
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className={"flex items-center gap-4"}>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className={"checkbox-label"}>
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"flex-1"}>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className={"shad-error"} />
        </FormItem>
      )}
    />
  );
};
export default CustomFormField;
