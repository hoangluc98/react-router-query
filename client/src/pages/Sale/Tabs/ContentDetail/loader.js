import { getSalesDetail } from '../../../../apis/sales';

export const contactDetailQuery = ({ params }) => ({
  queryKey: ['sale', 'detail', params.id],
  queryFn: async () => getSalesDetail(params.id)
});

export const loadSales = async (queryClient, ctx) => {
  const query = contactDetailQuery(ctx);

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
