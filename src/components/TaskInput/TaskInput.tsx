import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

export interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function TaskInput(props: Readonly<TaskInputProps>) {
  const { value, onChange, onSubmit, onCancel } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      onBlur={onCancel}
      placeholder="Task title"
    />
  );
}
