import type { StandardTextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { getIn } from 'formik';

interface IProps<V> extends StandardTextFieldProps {
  id?: string;
  name: string;
  placeholder?: string;
  formik: FormikProps<V>;
}

export const FTextInput = <FieldName extends string, V>({
                                                  name,
                                                  formik,
                                                  ...props
                                                }: IProps<V>): JSX.Element => {
  return (
    <TextField
      value={getIn(formik.values, name) ?? null}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={formik.isSubmitting}
      helperText={getIn(formik.touched, name) && getIn(formik.errors, name)}
      error={Boolean(getIn(formik.errors, name) && getIn(formik.touched, name))}
      {...props}
    />
  );
};
