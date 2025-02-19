import { TextField } from "@mui/material";


interface InputProps {
    type?: string;
    label: string;
    value: string;
    block?: boolean;
    onChange: (value: string) => void;
}

const InputText = ({ type, label, value, block, onChange }: InputProps) => {
    return (
        <TextField
            type={type ?? "text"}
            label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth={block ?? true}
            variant="outlined"
            className="mb-4"
        />
    );
};

export default InputText;