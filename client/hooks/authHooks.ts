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

          const response = await request.post('/api/v1/users/sync').send({
            auth0_id: user.sub,
            name:
              user.name || user.nickname || user.email?.split('@')[0] || 'User',
            email: user.email || '',
          })

          console.log('Sync response:', response.body)
          setDbUserId(response.body.id)
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

  const isOwnedByUser = (itemUserId: number, dbUserId: number) => {
    return itemUserId === dbUserId
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
    isOwnedByUser,
    login,
  }
}
