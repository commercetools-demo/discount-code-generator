/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />
import type { ApolloError } from '@apollo/client';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import RetrieveCartDiscount from './fetch-cart-discount.ctp.graphql';
import {
  TCartDiscount,
  TQuery,
  TQuery_CartDiscountArgs,
} from '../../types/generated/ctp';

type TQuery_CartDiscountArgsWithLocale = {
  locale: string;
} & TQuery_CartDiscountArgs;

type TUseRetrieveCartDiscountFetcher = (retrieveCartDiscountProps: {
  id?: string;
  key?: string;
  locale: string;
}) => {
  cartDiscount: TCartDiscount | undefined | null;
  error?: ApolloError;
  loading: boolean;
};

export const useCartDiscountRetriever: TUseRetrieveCartDiscountFetcher = ({
  id,
  key,
  locale,
}) => {
  const { data, error, loading } = useMcQuery<
    TQuery,
    TQuery_CartDiscountArgsWithLocale
  >(RetrieveCartDiscount, {
    variables: {
      id: id,
      key: key,
      locale: locale,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    cartDiscount: data?.cartDiscount,
    error,
    loading,
  };
};
