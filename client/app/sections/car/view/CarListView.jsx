"use client";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Iconify from "../../../components/iconify";
import EmptyContent from "../../../components/empty-content";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
//
import CarList from "../CarList";
import CarTableToolbar from "../CarTableToolbar";
import { getCarRequest, clearCarList, clearError } from "../../../actions/car";

// ----------------------------------------------------------------------

function CarListView({
  Car: { error, carList },
  Auth: { isAuthenticated },
  getCar,
  clrCarList,
  // clrMessage,
  clrError,
}) {
  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState("");
  const router = useRouter();
  // const msgToast = (msg) =>
  //   toast.success(msg, { autoClose: 5000, onClose: () => clrMessage() });

  const errToast = (err) => toast.error(err, { autoClose: 5000 });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }

    if (carList == null) {
      getCar();
    } else {
      setTableData(carList);
    }

    // eslint-disable-next-line
  }, [isAuthenticated, carList]);

  useEffect(() => {
    // if (message) {
    //   msgToast(message);
    // }
    if (error) {
      errToast(error);
    }

    // eslint-disable-next-line
  }, [error]);

  useEffect(
    () => () => {
      clrCarList();
      clrError();
    },
    // eslint-disable-next-line
    []
  );

  const dataFiltered = applyFilter({
    inputData: tableData,
    filterName,
  });

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName("");
  };

  const isFiltered = filterName !== "";

  const isNotFound =
    (!dataFiltered.length && !!filterName) || !dataFiltered.length;

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="Car List"
        links={[{ name: "Car", href: "/cars" }]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              href="/cars/create"
            >
              New Car
            </Link>
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ToastContainer />
      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <CarTableToolbar
          isFiltered={isFiltered}
          filterName={filterName}
          onFilterName={handleFilterName}
          onResetFilter={handleResetFilter}
        />
      </Stack>
      {isNotFound && <EmptyContent title="No Data" sx={{ py: 10 }} />}
      <CarList cars={dataFiltered} />
    </Container>
  );
}

CarListView.propTypes = {
  Car: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getCar: PropTypes.func.isRequired,
  // clrMessage: PropTypes.func.isRequired,
  clrError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Car: state.Car,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getCar: getCarRequest,
  clrCarList: clearCarList,
  // clrMessage: clearMessage,
  clrError: clearError,
})(CarListView);

function applyFilter({ inputData, filterName }) {
  if (filterName) {
    inputData = inputData.filter(
      (car) =>
        car.carModel.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
