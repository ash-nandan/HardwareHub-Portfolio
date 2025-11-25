import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { checkUser } from '../apis/users'

export function HandleRedirect() {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const handleRedirect = async () => {
      if (isLoading) return //pending check

      if (!isAuthenticated || !user?.sub) return //false checks

      //this is a flag - a locally stored note for remembering the state of something ie. that a profile is complete
      const profileComplete = localStorage.getItem('profileComplete') === 'true'

      if (profileComplete) {
        navigate('/')
        return //profile is already done > go home
      }

      try {
        const exists = await checkUser(user.sub)

        if (exists) {
          // user exists but has NOT finished profile > go to signup
          navigate('/signup')
        } else {
          // user finished profile > go home
          navigate('/')
        }
      } catch (err) {
        console.error(err)
      }
    }

    handleRedirect()
  }, [isAuthenticated, isLoading, user, navigate])

  return <p>Loading...</p>
}
