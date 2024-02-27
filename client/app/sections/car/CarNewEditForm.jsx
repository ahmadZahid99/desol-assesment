import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo } from "react";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
//
import {
  Card,
  Grid,
  Stack,
  Typography,
  Divider,
  FormHelperText,
} from "@mui/material";

import { fData } from "../../utils/formatNumber";
// components

import FormProvider, { RHFTextField } from "../../components/hook-form";

import { Upload } from "../../components/upload";

// ----------------------------------------------------------------------

const CarSchema = Yup.object().shape({
  carModel: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  price: Yup.number().required("Required"),
  phoneNumber: Yup.string()
    .length(11, "Must be exactly 11 characters")
    .required("Required"),
  maxPictures: Yup.number()
    .min(1, "Must be at least 1")
    .max(10, "Must be at most 10")
    .required("Required"),
  pictures: Yup.array().max(
    Yup.ref("maxPictures"),
    ({ maxPictures }) => `You can upload at most ${maxPictures} pictures.`
  ),
});

function CarNewEditForm({ isEdit = false, currentCar, handleSubmited }) {
  const defaultValues = useMemo(
    () => ({
      carModel: currentCar?.carModel || "",
      price: currentCar?.price || "",
      phoneNumber: currentCar?.phoneNumber || "",
      city: currentCar?.city || "",
      maxPictures: currentCar?.maxPictures || 1,
      pictures: currentCar?.pictures || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCar]
  );

  const methods = useForm({
    resolver: yupResolver(CarSchema),
    defaultValues,
  });
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentCar) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCar]);

  const handleDrop = useCallback(
    (acceptedFiles, name) => {
      const length = acceptedFiles.length;

      if (length > values.maxPictures) {
        setError(
          "pictures",
          `You can upload at most ${values.maxPictures} pictures.`
        );
      }

      let files = [];

      acceptedFiles.map((file) => {
        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        files.push(newFile);
      });

      if (files) {
        setValue(name, files);
      }
    },
    [setValue]
  );

  const onSubmit = async (inputData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const carData = {
        carModel: inputData.carModel,
        price: inputData.price,
        phoneNumber: inputData.phoneNumber,
        city: inputData.city,
        maxPictures: inputData.maxPictures,
        pictures: inputData.pictures,
      };

      handleSubmited(carData);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <RHFTextField name="carModel" label="Model *" />
                </Grid>

                <Grid item xs={4}>
                  <RHFTextField name="price" label="Price *" />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField name="phoneNumber" label="Phone Number *" />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField name="city" label="City *" />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    name="maxPictures"
                    label="No. of Pictures *"
                    type="number"
                    inputProps={{ max: 10, min: 1 }}
                  />
                </Grid>
              </Grid>

              <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />

              <Controller
                name="pictures"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <Upload
                    multiple
                    maxSize={3145728}
                    thumbnail
                    onDrop={(acceptedFiles) =>
                      handleDrop(acceptedFiles, `pictures`)
                    }
                    accept={{ "image/*": [] }}
                    onRemoveAll={() =>
                      setValue("pictures", [], { shouldValidate: true })
                    }
                    files={field.value}
                    error={!!error}
                    onRemove={(inputFile) =>
                      setValue(
                        "pictures",
                        values.pictures &&
                          values.pictures?.filter((file) => file !== inputFile),
                        { shouldValidate: true }
                      )
                    }
                    helperText={
                      !!error && (
                        <FormHelperText error={!!error} sx={{ px: 2 }}>
                          {error ? (
                            error?.message
                          ) : (
                            <Typography
                              variant="caption"
                              sx={{
                                display: "block",
                                textAlign: "center",
                                color: "text.secondary",
                              }}
                            >
                              Allowed *.jpeg, *.jpg, *.png, *.gif
                              <br /> max size of {fData(3145728)}
                            </Typography>
                          )}
                        </FormHelperText>
                      )
                    }
                  />
                )}
              />

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="soft"
                  loading={isSubmitting}
                >
                  {!isEdit ? "Submit" : "Save Changes"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

CarNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCar: PropTypes.object,
  handleSubmited: PropTypes.func,
  handleData: PropTypes.func,
};

export default connect(null, {})(CarNewEditForm);
