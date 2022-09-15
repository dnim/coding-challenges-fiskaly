import * as React from 'react';
import { FC } from 'react';
import { FormikHelpers, useFormik, } from 'formik';
import { Button, Stack, Card, Typography } from "@mui/material";
import * as yup from 'yup';
import { FTextInput } from "./FTextInput";
import { CONTENT_MAX_WIDTH } from "../utils/constants";

export interface CustomerFormValues {
  firstName?: string;
  lastName?: string;
  mail?: string;
}

interface Props {
  onSubmit: (values: CustomerFormValues) => void;
}

export const AddCustomerForm: FC<Props> = ({ onSubmit }) => {

  const initialValues: CustomerFormValues = {
    firstName: undefined,
    lastName: undefined,
    mail: undefined,
  };

  const handleSubmit = (
    values: CustomerFormValues,
    actions: FormikHelpers<CustomerFormValues>
  ) => {
    actions.setSubmitting(true);
    onSubmit(values);
    actions.setSubmitting(false);
  };

  const validationSchema = yup.object({
    firstName: yup.string().required('A first name is required'),
    lastName: yup.string().required('A last name is required'),
    mail: yup.string().email('Enter a valid e-mail address')
      .required('an E-mail address is required'),
  });

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={2} justifyContent="space-between" p={4} sx={{ maxWidth: CONTENT_MAX_WIDTH }} >
        <Stack gap={2}>
          <Card sx={{ p: 3 }}>
            <Stack gap={2}>
              <Typography variant="subtitle2" color="grey" fontWeight={700}>
                Add new customer
              </Typography>
              <Stack gap={3}>
                <Stack direction="row" gap={2}>
                  <FTextInput
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First name"
                    formik={formik}
                  />
                  <FTextInput
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    formik={formik}
                  />
                  <FTextInput
                    fullWidth
                    id="mail"
                    name="mail"
                    label="E-mail"
                    formik={formik}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Stack>

        <Stack alignItems="flex-end">
          <Button
            name="submit"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Saving' : 'Add customer'}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
