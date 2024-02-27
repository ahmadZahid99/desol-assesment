import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";

import Pagination, { paginationClasses } from "@mui/material/Pagination";
import CarItem from "./CarItem";

// ----------------------------------------------------------------------

export default function CarList({ cars }) {
  return (
    <>
      {cars.length && (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          {cars.map((car) => (
            <CarItem key={car._id} car={car} />
          ))}
        </Box>
      )}

      {cars.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: "center",
            },
          }}
        />
      )}
    </>
  );
}

CarList.propTypes = {
  cars: PropTypes.array,
};
