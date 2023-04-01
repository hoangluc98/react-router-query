import { getSalesData } from '../../../../apis/sales';

export const contactDetailQuery = ({ params }) => ({
  queryKey: ['sale', params.tab],
  queryFn: async () => getSalesData(params.tab)
});

export const loadSales = async (queryClient, ctx) => {
  const query = contactDetailQuery(ctx);

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
