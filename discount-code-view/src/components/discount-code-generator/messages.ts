import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'DiscountCodeGenerator.title',
    description: 'The page title of discount code',
    defaultMessage: 'Create New Discount Codes',
  },
  subtitle: {
    id: 'DiscountCodeGenerator.subtitle',
    description: 'The page sub title of discount code',
    defaultMessage: 'for Cart Discount "{cartDiscount}"',
  },
  createSuccess: {
    id: 'DiscountCodeGenerator.form.message.success',
    description: 'Success message for create discount code',
    defaultMessage: 'Your Discount Code(s) have been created.',
  },
  noResults: {
    id: 'DiscountCodeGenerator.noResults',
    defaultMessage: 'No data found.',
  },
});
