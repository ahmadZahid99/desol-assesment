import PropTypes from "prop-types";
// @mui
import { Typography, Stack } from "@mui/material";
// components

import Image from "../components/image";
//
import {
  StyledRoot,
  StyledSectionBg,
  StyledSection,
  StyledContent,
} from "./styles";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Login | Desol Int.",
  description: "This is the login page for the Desol Int. car app",
};

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <StyledSection>
        <Typography
          variant="h3"
          sx={{ mb: 6, mt: 4, maxWidth: 480, textAlign: "center" }}
        >
          {title || "Hi, Welcome back"}
        </Typography>

        <Image
          disabledEffect
          alt="auth"
          src={
            illustration || "/assets/illustrations/illustration_dashboard.png"
          }
          sx={{ maxWidth: 720, height: "70vh", width: "100%" }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1, height: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
