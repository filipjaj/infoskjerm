import "../styles/globals.scss"
import { UserContext } from '@/lib/context';

import { useState } from "react"
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {useUserData} from '@/hooks/firebase'
function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
        </UserContext.Provider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
