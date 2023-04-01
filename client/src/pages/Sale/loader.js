import { getSales } from '../../apis/sales';

export const contactDetailQuery = () => ({
  queryKey: ['sale'],
  queryFn: async () => getSales()
});

export const loadSales = async (queryClient) => {
  const query = contactDetailQuery();

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
