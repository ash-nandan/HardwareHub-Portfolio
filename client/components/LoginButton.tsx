import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          appState: { returnTo: '/login' },
        })
      }
      className="flex cursor-pointer items-center gap-3 rounded-none bg-hardware-grey px-4 py-3 font-mono text-hardware-charcoal"
    >
      Log In / Sign up
    </Button>
  )
}

export default LoginButton

//appState = a temporary storage box from auth0. Because clicking login makes you leave your app, signin on auth0 then return, appState is a way of saying "when you come back, navigate to here" aka returnTo
