/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomView}
 */
const config = {
  name: 'Discount Code View',
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: '${env:INITIAL_PROJECT_KEY}',
      hostUriPath: "tech-sales-good-store/discounts/carts/b33adf43-8ddd-48e3-a3e1-94f2d37875a5/general"
    },
    production: {
      customViewId: '${env:CUSTOM_VIEW_ID}',
      url: '${env:APPLICATION_URL}',
    },
  },
  oAuthScopes: {
    view: ['view_cart_discounts'],
    manage: ['manage_discount_codes'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: [
      'discounts.cart_discount_details.general',
      'discounts.cart_discount_details.custom_details'
  ],
};

export default config;
