import { useAuth0 } from '@auth0/auth0-react'

export function useAuth() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0()

  return {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  }
}

// export function isOwner(listingUserId: string) {
//   const { user } = useAuth0()
//   return isAuthenticated

// }
