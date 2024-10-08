import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'

import { client } from '@/services'
import { LoadingProvider } from '@/contexts'
import { Router } from '@/routes'

import '@/styles/globals.css'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <LoadingProvider>
        <Router />
      </LoadingProvider>
    </ApolloProvider>
  </StrictMode>,
)
