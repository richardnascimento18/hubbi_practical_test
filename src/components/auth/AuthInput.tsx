interface AuthInputProps {
  label: string
  value: any
  notRender?: boolean
  required?: boolean
  type?: "text" | "email" | "password"
  onChange: (newValeu: any) => void
}

export default function AuthInput(props: AuthInputProps) {
  return props.notRender ? null : (
    <div className="flex flex-col mt-4">
      <label>{props.label}</label>
      <input type={props.type ?? "text"} value={props.value} onChange={event => props.onChange?.(event.target.value) } required={props.required}
        className={`px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-white focus:border-blue-500 focus:outline-none`}
      />
    </div>
  );
}