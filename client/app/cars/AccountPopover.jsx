"use client";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState, memo } from "react";

import { useRouter } from "next/navigation";

// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, MenuItem } from "@mui/material";
// action
import { logoutRequest } from "../actions/auth";
// routes

// components
import { CustomAvatar } from "../components/custom-avatar";
// import { useSnackbar } from '../components/snackbar';
import MenuPopover from "../components/menu-popover";
import { IconButtonAnimate } from "../components/animate";

// ----------------------------------------------------------------------

const AccountPopover = memo(({ Auth: { user }, logout }) => {
  const router = useRouter();
  // const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();

      router.push("/login");
      handleClosePopover();
    } catch (error) {
      console.error(error);
      // enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src="" alt={user?.full_name} name={user?.full_name} />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.full_name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
});
AccountPopover.propTypes = {
  Auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
AccountPopover.displayName = "AccountPopover";
export default connect(mapStateToProps, {
  logout: logoutRequest,
})(AccountPopover);
