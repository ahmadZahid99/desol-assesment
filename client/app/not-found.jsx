// @mui
import { Button, Typography, Box } from "@mui/material";

// assets
import { PageNotFoundIllustration } from "./assets/illustrations";
import Link from "next/link";

// ----------------------------------------------------------------------

export const metadata = {
  title: "404 Page Not Found | Desol Int.",
};

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>
      </div>

      <div>
        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>
      </div>

      <div>
        <PageNotFoundIllustration
          sx={{
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </div>

      <Button size="large" variant="contained">
        <Link href="/cars" style={{ textDecoration: "none", color: "#fff" }}>
          Go to Home
        </Link>
      </Button>
    </Box>
  );
}
