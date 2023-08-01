import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";

interface PasswordFieldProps {
    label: string;
    isConfirmation?: boolean;
    autoComplete?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, isConfirmation = false, autoComplete }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <TextField
            required
            fullWidth
            name={isConfirmation ? "confirmation" : "password"}
            label={isConfirmation ? `Confirm ${label}` : label}
            type={showPassword ? 'text' : 'password'}
            id={isConfirmation ? "confirmation" : "password"}
            autoComplete={autoComplete}
            InputProps={{
                endAdornment: (
                    <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                ),
            }}
        />
    );
};

export default PasswordField;