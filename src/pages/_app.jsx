import '@/styles/globals.sass'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '@/layout/Layout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },})

export default function App({ Component, pageProps }) {
  return(
  <QueryClientProvider client={queryClient}>
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  </QueryClientProvider>
  )
}