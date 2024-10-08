import { useContext } from 'react'
import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { LoadingScreen } from '@/components'
import { loadingContext } from '@/contexts'

export const Loading = (): ReactElement => {
  const { isLoading } = useContext(loadingContext)

  return (
    <>
      {isLoading && <LoadingScreen/>}
      <Outlet/>
    </>
  )
}
