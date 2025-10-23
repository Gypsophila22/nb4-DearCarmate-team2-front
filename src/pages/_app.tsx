import type { AppProps } from 'next/app'
import '@styles/base.scss'
import '@styles/css/vars.css'
import SpoqaHanSansNeo from 'public/fonts/localfonts'
import NavigationLayout from '@ui/shared/layout/NavigationLayout/NavigationLayout'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FormModalProvider } from '@ui/shared/modal/form-modal/formModalContext'
import { ConfirmModalProvider } from '@ui/shared/modal/confirm-modal/confirmModalContext'

const App = ({ Component, pageProps, router }: AppProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient(
      {
        defaultOptions: {
          queries: {
            staleTime: 0,
          },
        },
      },
    )
  })

  const getContent = () => {
    if (router.pathname === '/signin' || router.pathname === '/signup' || router.pathname === '/setting') return <Component {...pageProps} />
    return (
      <NavigationLayout>
        <Component {...pageProps} />
      </NavigationLayout>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <FormModalProvider>
        <ConfirmModalProvider>
          <main className={SpoqaHanSansNeo.className}>
            {getContent()}
            <div id="loading" />
            <div id="form" />
            <div id="confirm" />
          </main>
        </ConfirmModalProvider>
      </FormModalProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default App
