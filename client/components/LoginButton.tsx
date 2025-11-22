import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <Button
      onClick={() => loginWithRedirect()}
      className="flex cursor-pointer items-center gap-3 rounded-none bg-hardware-grey px-4 py-3 font-mono text-hardware-charcoal"
    >
      Log In / Sign upnp
    </Button>
  )
}

export default LoginButton
