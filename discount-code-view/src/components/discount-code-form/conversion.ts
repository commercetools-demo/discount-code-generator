import { TFormValues } from './discount-code-form';
import { TCartDiscount, TDiscountCodeDraft } from '../../types/generated/ctp';
import { createRandomString } from '../../helpers';
import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedStringToLocalizedField } from '@commercetools-frontend/l10n';

const getString = (input: string | undefined | null): string | undefined => {
  return input && input.length > 0 ? input : undefined;
};
const getNumber = (input: number | undefined | null): number | undefined => {
  return input && input > 0 ? input : undefined;
};
export const toFormValues = (
  cartDiscount: TCartDiscount,
  projectLanguages: Array<string>
): TFormValues => {
  return {
    quantity: 100,
    length: 11,
    prefix: '',
    condition: '',
    cartDiscountId: cartDiscount.id,
    name: LocalizedTextInput.createLocalizedString(projectLanguages, {}),
    description: LocalizedTextInput.createLocalizedString(projectLanguages, {}),
    validFrom: '',
    validUntil: '',
  };
};
export const formValuesTo = (
  formValues: TFormValues
): Array<TDiscountCodeDraft> => {
  const result: Array<TDiscountCodeDraft> = [];
  for (let i = 0; i < formValues.quantity; i++) {
    const draft: TDiscountCodeDraft = {
      name: transformLocalizedStringToLocalizedField(
        LocalizedTextInput.omitEmptyTranslations(formValues.name)
      ),
      description: transformLocalizedStringToLocalizedField(
        LocalizedTextInput.omitEmptyTranslations(formValues.description)
      ),
      cartDiscounts: [
        { typeId: 'cart-discount', id: formValues.cartDiscountId },
      ],
      code:
        formValues.prefix +
        createRandomString(formValues.length - formValues.prefix.length),
      validFrom: getString(formValues.validFrom),
      validUntil: getString(formValues.validUntil),
      maxApplications: getNumber(formValues.maxApplications),
      maxApplicationsPerCustomer: getNumber(
        formValues.maxApplicationsPerCustomer
      ),
      cartPredicate: getString(formValues.condition),
    };
    result.push(draft);
  }
  return result;
};
