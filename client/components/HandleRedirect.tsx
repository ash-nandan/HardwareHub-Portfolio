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

//useEffect reminder - runs side code after rendering some data
//[isAuthenticated, user, navigate] - these things should trigger this side code if they are changed
//We need since auth0 takes some time to return authentication and user data
//if (isAuthenticated && user?.sub) > try checking db for authId of user > if it doesn't exist, go to signup page > else, go to home page if it exists
//UPDATE - moved useEffect to its own component to only run when /redirect route is triggered on click of the sign in button rather than running automatically
