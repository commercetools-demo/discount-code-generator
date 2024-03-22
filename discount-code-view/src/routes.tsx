import type { ReactNode } from 'react';
import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import { PageNotFound } from '@commercetools-frontend/application-components';
import DiscountCodeGenerator from './components/discount-code-generator';

type ApplicationRoutesProps = {
  children?: ReactNode;
};

const ApplicationRoutes = (_props: ApplicationRoutesProps) => {
  const { hostUrl } = useCustomViewContext((context) => ({
    hostUrl: context.hostUrl,
  }));

  if (hostUrl) {
    const splittedUrl = hostUrl.split('/');
    const discountsIndex = splittedUrl.indexOf('discounts');
    const cartsIndex = splittedUrl.indexOf('carts');

    if (discountsIndex >= 0 && cartsIndex >= 0) {
      const cartDiscountId = splittedUrl[cartsIndex + 1];
      return <DiscountCodeGenerator discountCodeId={cartDiscountId} />;
    }
  }
  return <PageNotFound />;
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
