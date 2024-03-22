import {
  FormMainPage,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import DiscountCodeForm, {
  TFormValues,
} from '../discount-code-form/discount-code-form';
import { FC, useCallback } from 'react';
import {
  showApiErrorNotification,
  TApiErrorNotificationOptions,
  useShowNotification,
} from '@commercetools-frontend/actions-global';
import { DOMAINS } from '@commercetools-frontend/constants';
import { useIntl } from 'react-intl';
import messages from './messages';
import { formValuesTo, toFormValues } from '../discount-code-form/conversion';
import { transformErrors } from '../transform-errors';
import { useCartDiscountRetriever } from '../../hooks/use-cart-discount-connector';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { getErrorMessage } from '../../helpers';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import { useDiscountCodeCreator } from '../../hooks/use-discount-code-connector';

type Props = {
  discountCodeId: string;
};
const DiscountCodeGenerator: FC<Props> = ({ discountCodeId }) => {
  const showNotification = useShowNotification();
  const { dataLocale, languages } = useCustomViewContext((context) => {
    return {
      dataLocale: context.dataLocale ?? 'en-US',
      languages: context.project?.languages ?? [],
    };
  });
  const discountCodeCreator = useDiscountCodeCreator();
  const { cartDiscount, loading, error } = useCartDiscountRetriever({
    id: discountCodeId,
    locale: dataLocale,
  });
  const intl = useIntl();
  const handleSubmit = useCallback(
    async (formikValues: TFormValues, formikHelpers) => {
      try {
        const drafts = formValuesTo(formikValues);
        drafts.forEach((draft) =>
          discountCodeCreator.execute({ draft: draft })
        );
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.createSuccess),
        });
      } catch (graphQLErrors) {
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors:
              transformedErrors.unmappedErrors as TApiErrorNotificationOptions['errors'],
          });
        }

        formikHelpers.setErrors(transformedErrors.formErrors);
      }
    },
    [intl, discountCodeCreator]
  );

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  if (loading) {
    return (
      <Spacings.Stack alignItems="center">
        <LoadingSpinner />
      </Spacings.Stack>
    );
  }

  if (!loading && !cartDiscount) {
    return (
      <ContentNotification type="info">
        <Text.Body intlMessage={messages.noResults} />
      </ContentNotification>
    );
  }
  if (cartDiscount === undefined || cartDiscount === null) {
    return (
      <ContentNotification type="info">
        <Text.Body intlMessage={messages.noResults} />
      </ContentNotification>
    );
  }

  return (
    <DiscountCodeForm
      initialValues={toFormValues(cartDiscount, languages)}
      onSubmit={handleSubmit}
    >
      {(formProps) => {
        return (
          <FormMainPage
            title={intl.formatMessage(messages.title)}
            subtitle={intl.formatMessage(messages.subtitle, {
              cartDiscount: cartDiscount?.name,
            })}
            onPrimaryButtonClick={() => formProps.submitForm()}
            labelSecondaryButton={FormModalPage.Intl.revert}
            onSecondaryButtonClick={formProps.handleReset}
            isPrimaryButtonDisabled={
              formProps.isSubmitting || !formProps.isDirty
            }
            isSecondaryButtonDisabled={
              formProps.isSubmitting || !formProps.isDirty
            }
          >
            {formProps.formElements}
          </FormMainPage>
        );
      }}
    </DiscountCodeForm>
  );
};

export default DiscountCodeGenerator;
