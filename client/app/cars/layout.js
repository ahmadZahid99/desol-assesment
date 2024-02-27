"use client";
import PropTypes from "prop-types";
// @mui
import { useTheme } from "@mui/material/styles";
import { Stack, AppBar, Toolbar, Box } from "@mui/material";
// utils
import { bgBlur } from "../utils/cssStyles";
// components

import AccountPopover from "./AccountPopover";
import Image from "next/image";

// ----------------------------------------------------------------------

const Header = ({ children }) => {
  const theme = useTheme();

  const SPACING = 8;

  const renderContent = (
    <>
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
          height: 64,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(["height"], {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          <Image src="/main.svg" width="145" height="40" alt="Desol Logo" />
          {renderContent}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 2,
            py: `${92 + SPACING}px`,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default Header;
