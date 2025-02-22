import { TextField } from "@mui/material";
import { twMerge } from "tailwind-merge";

interface InputProps {
    type?: string;
    label: string;
    value: string;
    block?: boolean;
    style?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

const InputText = ({ type, label, value, block, style, disabled, onChange }: InputProps) => {
    return (
        <TextField
            type={type ?? "text"}
            label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth={block ?? true}
            className={twMerge("my-4", style)}
            disabled={disabled ?? false}
            variant="outlined"
        />
    );
};

export default InputText;