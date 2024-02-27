// import { Link as RouterLink } from "react-router-dom";
import Link from "next/link";
// @mui
import { Stack, Typography } from "@mui/material";
// routes
// import { PATH_AUTH } from "../../routes/paths";

//
import AuthLoginForm from "./AuthLoginForm";

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Sign in to Desol Int.</Typography>
      </Stack>

      {/* <Stack direction="row" spacing={1} marginBottom={1}>
        <Typography variant="body2">New user?</Typography>

        <Link
          href="/register"
          // component={RouterLink}
          // to={PATH_AUTH.register}
          // variant="subtitle2"
        >
          Create an account
        </Link>
      </Stack> */}
      <AuthLoginForm />
    </>
  );
}
