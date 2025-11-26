import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import request from 'superagent'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0()
  const [dbUserId, setDbUserId] = useState<number | null>(null)

  useEffect(() => {
    const syncUser = async () => {
      if (user && user.sub && !dbUserId) {
        try {
          console.log('Auth0 User:', user)

          //simplify data send to authId and email - rest will be filled out on signup page - Joel
          const response = await request.post('/api/v1/users/sync').send({
            authId: user.sub,
            email: user.email,
          })

          console.log('Sync response:', response.body)
          setDbUserId(response.body.user.id) //body updated since switch id added - Joel
        } catch (error) {
          console.error('Error syncing user:', error)
        }
      } else {
        console.log('User or user.sub not available yet')
      }
    }
    syncUser()
  }, [user, dbUserId])

  const getUserId = (): number | null => {
    return dbUserId
  }

  const isOwner = (resourceUserId: number): boolean => {
    if (!isAuthenticated || !dbUserId) return false
    return dbUserId === resourceUserId
  }

  const login = () => loginWithRedirect()

  return {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    dbUserId,
    getUserId,
    isOwner,
    login,
  }
}
