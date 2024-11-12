import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import { FormInputText } from "./form-components/FormInputText";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function LoginFormOnly({ control, handleSubmit, handleLogin }: any) {
  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    setShowPassword((show) => !show);
  }

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmit(handleLogin)}>
        <FormInputText
          name="login"
          control={control}
          label="Login"
          sx={{ mb: 2 }}
          required
          autoFocus
          autoComplete="login"
        />
        <FormInputText
          name="password"
          control={control}
          autoComplete="current-password"
          label="Password"
          sx={{ mb: 2 }}
          required
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox
            value="remember"
            color="primary"
            name="remember"
          />}
          label="Remember Me"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }}>
          Login
        </Button>
      </Box>
    </>
  )
}