import { Control } from "react-hook-form";
import { SxProps, Theme } from "@mui/material";

export interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  sx?: SxProps<Theme>;
  required?: boolean;
  autoFocus?: boolean;
  type?: string;
  autoComplete?: string;
  InputProps?: any;
}
