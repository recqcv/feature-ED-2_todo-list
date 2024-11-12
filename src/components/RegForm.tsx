import { Box, Button, TextField } from "@mui/material";

export default function RegForm({ handleSubmitForm }: any) {


  return (
    <>
      <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmitForm}>
        <TextField
          name="username"
          placeholder="Your name"
          id="user-name"
          type="name"
          fullWidth
          required
          autoComplete="given-name"
          sx={{ mb: 2 }}
          autoFocus
          label="Your name"
          inputProps={{ 
            pattern: "[a-zA-Zа-яА-ЯёЁ]{1,60}",
           }}
        />
        <TextField
          name="login"
          placeholder="Login"
          id="user-login"
          type="login"
          fullWidth
          required
          autoComplete="nickname"
          sx={{ mb: 2 }}
          label="Login"
        />
        <TextField
          name="password"
          placeholder="Password"
          id="user-password"
          type="password"
          fullWidth
          required
          autoComplete="off"
          sx={{ mb: 2 }}
          label="Password"
        />
        <TextField
          name="repeat_password"
          placeholder="Repeat Password"
          id="user-password-repeat"
          type="password"
          fullWidth
          required
          autoComplete="off"
          sx={{ mb: 2 }}
          label="Repeat Password"
        />
        <TextField
          name="email"
          placeholder="Email"
          id="user-email"
          type="email"
          fullWidth
          required
          autoComplete="email"
          sx={{ mb: 2 }}
          label="Email"
        />
        <TextField
          name="phoneNumber"
          placeholder="Phone Number"
          id="user-phone"
          type="phone"
          fullWidth
          autoComplete="phone"
          sx={{ mb: 2 }}
          label="Phone Number"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} >
          register
        </Button>
      </Box>
    </>
  );
}