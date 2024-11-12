import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { FormInputProps } from "./form-input-props";

export const FormInputText = ({ name, control, label, sx, required, autoFocus, type,autoComplete, InputProps  }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: required }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          size="small"
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? null}
          sx={sx}
          required={required}
          autoFocus={autoFocus}
          variant="outlined"
          type={type}
          autoComplete={autoComplete}
          InputProps={InputProps}
        />
      )}
    />
  );
};
