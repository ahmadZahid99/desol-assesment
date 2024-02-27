import PropTypes from "prop-types";

import Link from "next/link";
// @mui
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// routes

// components
import ImageComponent from "../../components/image";
import Iconify from "../../components/iconify";
// ----------------------------------------------------------------------

export default function CarItem({ car }) {
  const { id, carModel, phoneNumber, price, pictures, user } = car;
  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      {pictures.length && (
        <>
          <Stack flexGrow={1} sx={{ position: "relative" }}>
            <ImageComponent
              alt={pictures[0]}
              src={pictures[0]}
              // ratio="1/1"
              sx={{ borderRadius: 1, height: 164, width: 1 }}
            />
          </Stack>
          {pictures.length > 1 && (
            <Stack spacing={0.5}>
              <ImageComponent
                alt={pictures[1]}
                src={pictures[1]}
                ratio="1/1"
                sx={{ borderRadius: 1, width: 80 }}
              />
              {pictures.length > 2 && (
                <ImageComponent
                  alt={pictures[2]}
                  src={pictures[2]}
                  ratio="1/1"
                  sx={{ borderRadius: 1, width: 80 }}
                />
              )}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      secondary={
        // <Link
        //   // variant="subtitle2"
        //   // underline="hover"
        //   href={`/car/${id}`}
        //   // color="inherit"
        //   style={{
        //     textDecoration: "none",
        //   }}
        // >
        <Typography variant="h5">{carModel}</Typography>
        // </Link>
      }
      primaryTypographyProps={{
        typography: "caption",
        color: "text.disabled",
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: "span",
        color: "text.primary",
        typography: "subtitle1",
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: "relative",
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      {[
        {
          label: `$${price}`,
          icon: (
            <Iconify
              icon="solar:tag-price-outline"
              sx={{ color: "warning.main" }}
            />
          ),
        },
        {
          label: phoneNumber,
          icon: (
            <Iconify icon="mingcute:phone-line" sx={{ color: "info.main" }} />
          ),
        },
        {
          label: user?.full_name || "admin",
          icon: (
            <Iconify icon="solar:user-outline" sx={{ color: "primary.main" }} />
          ),
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          sx={{ typography: "body2" }}
        >
          <Stack>{item.icon}</Stack>
          <Typography
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // Set the number of lines you want to display
              textOverflow: "ellipsis",
            }}
          >
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>
    </>
  );
}

CarItem.propTypes = {
  car: PropTypes.object,
};
