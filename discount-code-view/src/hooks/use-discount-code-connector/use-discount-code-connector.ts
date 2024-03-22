import { useMcMutation } from '@commercetools-frontend/application-shell-connectors';
import {
  TDiscountCodeDraft,
  TMutation,
  TMutation_CreateDiscountCodeArgs,
} from '../../types/generated/ctp';
import CreateQuery from './create-discount-code-ctp.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { extractErrorFromGraphQlResponse } from '../../helpers';

export const useDiscountCodeCreator = () => {
  const [createDiscountCode, { loading }] = useMcMutation<
    TMutation,
    TMutation_CreateDiscountCodeArgs
  >(CreateQuery);

  const execute = async ({ draft }: { draft: TDiscountCodeDraft }) => {
    try {
      return await createDiscountCode({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          draft: draft,
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    loading,
    execute,
  };
};
