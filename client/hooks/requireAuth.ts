import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

export function useRequireAuth() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
        },
      })
    }
  }, [isAuthenticated, isLoading, loginWithRedirect])

  return { isAuthenticated, isLoading }
}
