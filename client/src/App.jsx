import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RouteC from './Router';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, refetchOnWindowFocus: false }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteC />
    </QueryClientProvider>
  );
}

export default App;
