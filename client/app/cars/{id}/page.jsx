import PropTypes from "prop-types";
import { connect } from "react-redux";
import { memo, useEffect } from "react";
// import { Helmet } from "react-helmet-async";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @mui
import { Container, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";
// components

import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import CarDetailsCarousel from "../../sections/car/CarDetailsCarousel";
import CarDetailsSummary from "../../sections/car/CarDetailsSummary";
// action
import {
  getCarByIdRequest,
  clearCar,
  clearMessage,
  clearError,
} from "../../actions/car";

// ----------------------------------------------------------------------

const OrderDetails = memo(
  ({
    Car: { car, message, error },
    Auth: { isAuthenticated },
    getCarById,
    clrCar,
    clrMessage,
    clrError,
  }) => {
    const navigate = useNavigate();

    const location = useLocation();

    const msgToast = (msg) =>
      toast.success(msg, { autoClose: 5000, onClose: () => clrMessage() });

    const errToast = (err) =>
      toast.error(err, { autoClose: 5000, onClose: () => clrError() });

    useEffect(() => {
      getCarById(location.pathname.split("/").slice(-1)[0]);

      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      if (!isAuthenticated) {
        navigate(PATH_AUTH.login, { replace: true });
      }
      if (message) {
        msgToast(message);
      }
      if (error) {
        errToast(error, { variant: "error" });
      }

      // eslint-disable-next-line
    }, [isAuthenticated, message, error]);

    // Clear Every List
    useEffect(
      () => () => {
        clrCar();
      },
      // eslint-disable-next-line
      []
    );

    return (
      <>
        {/* <Helmet>
          <title> Car Details | Buggaz Ltd</title>
        </Helmet> */}
        <ToastContainer />
        <Container maxWidth="lg">
          <CustomBreadcrumbs
            heading="Car Details"
            links={[
              { name: "Car", href: PATH_DASHBOARD.cars.root },
              { name: "Car Details" },
            ]}
          />
          {car && (
            <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
              <Grid item xs={12} md={6} lg={7}>
                <CarDetailsCarousel car={car} />
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <CarDetailsSummary car={car} />
              </Grid>
            </Grid>
          )}{" "}
        </Container>
      </>
    );
  }
);

OrderDetails.propTypes = {
  Car: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getCarById: PropTypes.func.isRequired,
  clrCar: PropTypes.func.isRequired,
  clrMessage: PropTypes.func.isRequired,
  clrError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Car: state.Car,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getCarById: getCarByIdRequest,
  clrCar: clearCar,
  clrMessage: clearMessage,
  clrError: clearError,
})(OrderDetails);
