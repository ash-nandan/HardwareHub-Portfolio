import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { checkUser } from '../apis/users'

export function HandleRedirect() {
  const { user, isAuthenticated } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const handleRedirect = async () => {
      if (isAuthenticated && user?.sub) {
        try {
          const exists = await checkUser(user.sub)
          if (exists) navigate('/signup')
          else navigate('/')
        } catch (err) {
          console.error(err)
        }
      }
    }
    handleRedirect()
  }, [isAuthenticated, user, navigate])

  return <p>Loading...</p>
}
