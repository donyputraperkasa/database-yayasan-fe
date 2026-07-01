import type { ReactNode } from "react";

type LoginFieldProps = {
  action?: ReactNode;
  autoComplete: string;
  disabled?: boolean;
  icon: ReactNode;
  label: string;
  name: string;
  placeholder: string;
  type: string;
};

export function LoginField(props: LoginFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#2b3445]">
        {props.label}
      </span>
      <span className="mt-2 flex h-12 items-center gap-3 rounded-md border border-[#ced9eb] px-3 transition focus-within:border-[#1f4f8f] focus-within:ring-2 focus-within:ring-[#1f4f8f]/15">
        <span className="text-[#728199]">{props.icon}</span>
        <input
          autoComplete={props.autoComplete}
          className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9aa6b8]"
          disabled={props.disabled}
          name={props.name}
          placeholder={props.placeholder}
          required
          type={props.type}
        />
        {props.action}
      </span>
    </label>
  );
}
