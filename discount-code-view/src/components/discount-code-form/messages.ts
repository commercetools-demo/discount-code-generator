import { defineMessages } from 'react-intl';

export default defineMessages({
  quantityTitle: {
    id: 'DiscountCodeForm.quantity.title',
    description: 'The title of quantity',
    defaultMessage: 'Quantity',
  },
  quantityHint: {
    id: 'DiscountCodeForm.quantity.hint',
    description: 'The hint of quantity',
    defaultMessage:
      'The quantity of discount codes to generate (Between 1 and 500 000)',
  },
  lengthTitle: {
    id: 'DiscountCodeForm.length.title',
    description: 'The title of length',
    defaultMessage: 'Length',
  },
  lengthHint: {
    id: 'DiscountCodeForm.length.hint',
    description: 'The hint of length',
    defaultMessage: 'The amount of characters for each generated code',
  },
  prefixTitle: {
    id: 'DiscountCodeForm.prefix.title',
    description: 'The title of prefix',
    defaultMessage: 'Prefix',
  },
  prefixHint: {
    id: 'DiscountCodeForm.prefix.hint',
    description: 'The hint of prefix',
    defaultMessage: 'The prefix for each discount code',
  },
  nameTitle: {
    id: 'DiscountCodeForm.name.title',
    defaultMessage: 'Name',
  },
  descriptionTitle: {
    id: 'DiscountCodeForm.description.title',
    defaultMessage: 'Description',
  },
  validFromTitle: {
    id: 'DiscountCodeForm.validFrom.title',
    defaultMessage: 'Valid from',
  },
  validUntilTitle: {
    id: 'DiscountCodeForm.validUntil.title',
    defaultMessage: 'Valid until',
  },
  maxApplicationsTitle: {
    id: 'DiscountCodeForm.validUntil.title',
    defaultMessage: 'Max applications',
  },
  maxApplicationsPerCustomerTitle: {
    id: 'DiscountCodeForm.validUntil.title',
    defaultMessage: 'Max applications per customer',
  },
  conditionTitle: {
    id: 'DiscountCodeForm.quantity.title',
    description: 'The title of condition',
    defaultMessage: 'Condition',
  },
  conditionHint: {
    id: 'DiscountCodeForm.quantity.hint',
    description: 'The hint of condition',
    defaultMessage:
      'When a condition is defined, the discount code can only be applied to carts that match this predicate (rule).',
  },
});
