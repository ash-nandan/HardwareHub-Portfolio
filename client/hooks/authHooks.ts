import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import request from 'superagent'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0()
  const [dbUserId, setDbUserId] = useState<number | null>(null)

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          const response = await request.post('/api/v1/users/sync').send({
            auth0_id: user.sub,
            username: user.name || user.nickname,
            email: user.email,
          })

          setDbUserId(response.body.id)
        } catch (error) {
          console.error('Error syncing user:', error)
        }
      }
    }

    syncUser()
  }, [user])

  const getUserId = (dbUserId: number) => {
    return dbUserId
  }

  const isOwnedByUser = (itemUserId: number, dbUserId: number) => {
    return itemUserId === dbUserId
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    dbUserId,
    getUserId,
    isOwnedByUser,
  }
}
