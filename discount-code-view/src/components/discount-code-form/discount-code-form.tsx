import { FormikHelpers, useFormik } from 'formik';
import { FC, ReactElement } from 'react';
import omitEmpty from 'omit-empty-es';
import Spacings from '@commercetools-uikit/spacings';
import NumberField from '@commercetools-uikit/number-field';
import messages from './messages';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import DateTimeInput from '@commercetools-uikit/date-time-input';
import FieldLabel from '@commercetools-uikit/field-label';
import Grid from '@commercetools-uikit/grid';
type Formik = ReturnType<typeof useFormik<TFormValues>>;

export type TFormValues = {
  quantity: number;
  length: number;
  prefix: string;
  cartDiscountId: string;
  name: Record<string, string>;
  description: Record<string, string>;
  validFrom: string;
  validUntil: string;
  maxApplications?: number;
  maxApplicationsPerCustomer?: number;
  condition: string;
};

type FormProps = {
  formElements: ReactElement;
  values: Formik['values'];
  isDirty: Formik['dirty'];
  isSubmitting: Formik['isSubmitting'];
  submitForm: Formik['handleSubmit'];
  handleReset: Formik['handleReset'];
};

type TErrors = {
  quantity: { min?: boolean; max?: boolean };
  length: { min?: boolean; max?: boolean };
  prefix: { tooLong?: boolean };
};

const validate = (formikValues: TFormValues) => {
  const errors: TErrors = { quantity: {}, length: {}, prefix: {} };
  if (formikValues.quantity < 1) {
    errors.quantity.min = true;
  } else if (formikValues.quantity > 500000) {
    errors.quantity.max = true;
  }
  if (formikValues.length < 7) {
    errors.length.min = true;
  } else if (formikValues.length > 30) {
    errors.length.max = true;
  }
  if (formikValues.prefix && formikValues.prefix.length > formikValues.length) {
    errors.prefix.tooLong = true;
  }

  return omitEmpty<TErrors>(errors);
};

type Props = {
  onSubmit: (
    values: TFormValues,
    formikHelpers: FormikHelpers<TFormValues>
  ) => void | Promise<unknown>;
  initialValues: TFormValues;
  children: (formProps: FormProps) => React.JSX.Element;
};
const DiscountCodeForm: FC<Props> = ({ initialValues, onSubmit, children }) => {
  const intl = useIntl();
  const { dataLocale } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
  }));
  const formik = useFormik<TFormValues>({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validate: validate,
    enableReinitialize: true,
  });
  const formElements = (
    <Spacings.Stack scale="l">
      <LocalizedTextField
        name="name"
        selectedLanguage={dataLocale}
        value={formik.values.name}
        title={intl.formatMessage(messages.nameTitle)}
        errors={
          LocalizedTextField.toFieldErrors<TFormValues>(formik.errors).name
        }
        touched={!!formik.touched.name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <LocalizedTextField
        name="description"
        selectedLanguage={dataLocale}
        value={formik.values.description}
        title={intl.formatMessage(messages.descriptionTitle)}
        errors={
          LocalizedTextField.toFieldErrors<TFormValues>(formik.errors)
            .description
        }
        touched={!!formik.touched.description}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <Grid
        display={'grid'}
        gridGap={'var(--spacing-m, 16px)'}
        gridTemplateColumns={'repeat(2, 1fr)'}
      >
        <Grid.Item>
          <Spacings.Stack scale={'s'}>
            <FieldLabel title={intl.formatMessage(messages.validFromTitle)} />
            <DateTimeInput
              name={'validFrom'}
              timeZone="Europe/Berlin"
              value={formik.values.validFrom}
              onChange={formik.handleChange}
            />
          </Spacings.Stack>
        </Grid.Item>
        <Grid.Item>
          <Spacings.Stack scale={'s'}>
            <FieldLabel title={intl.formatMessage(messages.validUntilTitle)} />
            <DateTimeInput
              name={'validUntil'}
              timeZone="Europe/Berlin"
              value={formik.values.validUntil}
              onChange={formik.handleChange}
            />
          </Spacings.Stack>
        </Grid.Item>
      </Grid>
      <Grid
        display={'grid'}
        gridGap={'var(--spacing-m, 16px)'}
        gridTemplateColumns={'repeat(2, 1fr)'}
      >
        <Grid.Item>
          <NumberField
            name="maxApplications"
            value={formik.values.maxApplications || ''}
            title={intl.formatMessage(messages.maxApplicationsTitle)}
            errors={
              NumberField.toFieldErrors<TFormValues>(formik.errors)
                .maxApplications
            }
            touched={!!formik.touched.maxApplications}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid.Item>
        <Grid.Item>
          <NumberField
            name="maxApplicationsPerCustomer"
            value={formik.values.maxApplicationsPerCustomer || ''}
            title={intl.formatMessage(messages.maxApplicationsPerCustomerTitle)}
            errors={
              NumberField.toFieldErrors<TFormValues>(formik.errors)
                .maxApplicationsPerCustomer
            }
            touched={!!formik.touched.maxApplicationsPerCustomer}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid.Item>
      </Grid>
      <TextField
        name="condition"
        value={formik.values.condition}
        title={intl.formatMessage(messages.conditionTitle)}
        hint={intl.formatMessage(messages.conditionHint)}
        errors={TextField.toFieldErrors<TFormValues>(formik.errors).condition}
        touched={!!formik.touched.condition}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <NumberField
        name="quantity"
        value={formik.values.quantity}
        title={intl.formatMessage(messages.quantityTitle)}
        hint={intl.formatMessage(messages.quantityHint)}
        isRequired
        errors={NumberField.toFieldErrors<TFormValues>(formik.errors).quantity}
        min={1}
        max={500000}
        touched={!!formik.touched.quantity}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <NumberField
        name="length"
        value={formik.values.length}
        title={intl.formatMessage(messages.lengthTitle)}
        hint={intl.formatMessage(messages.lengthHint)}
        isRequired
        errors={NumberField.toFieldErrors<TFormValues>(formik.errors).length}
        touched={!!formik.touched.length}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        min={7}
        max={30}
      />
      <TextField
        name="prefix"
        value={formik.values.prefix}
        title={intl.formatMessage(messages.prefixTitle)}
        hint={intl.formatMessage(messages.prefixHint)}
        errors={TextField.toFieldErrors<TFormValues>(formik.errors).prefix}
        touched={!!formik.touched.prefix}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
    </Spacings.Stack>
  );
  return children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};

export default DiscountCodeForm;
