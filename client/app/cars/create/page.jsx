"use client";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";

// @mui
import { Container } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";

// components
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
// sections
import CarNewEditForm from "../../sections/car/CarNewEditForm";

// actions
import { createCarRequest, clearMessage, clearError } from "../../actions/car";

// ----------------------------------------------------------------------

function CarCreatePage({
  Car: { message, error },
  Auth: { isAuthenticated },
  createCar,
  clrMessage,
  clrError,
}) {
  const router = useRouter();

  const msgToast = (msg) =>
    toast.success(msg, { autoClose: 5000, onClose: () => clrMessage() });

  const errToast = (err) =>
    toast.error(err, { autoClose: 5000, onClose: () => clrError() });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (message) {
      msgToast(message);
    }
    if (error) {
      errToast(error);
    }

    // eslint-disable-next-line
  }, [message, error]);

  const handleSubmit = (carData) => {
    createCar(carData);
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="Create a car"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          links={[{ name: "Cars", href: "/cars" }, { name: "New Car" }]}
        />

        <CarNewEditForm handleSubmited={handleSubmit} />
      </Container>
    </>
  );
}

CarCreatePage.propTypes = {
  Car: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  createCar: PropTypes.func.isRequired,
  clrMessage: PropTypes.func.isRequired,
  clrError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Car: state.Car,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  createCar: createCarRequest,
  clrMessage: clearMessage,
  clrError: clearError,
})(CarCreatePage);
