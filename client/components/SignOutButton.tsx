import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'

const SignOutButton = () => {
  const { logout } = useAuth0()
  return (
    <Button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="rounded-none p-2"
    >
      Log Out
    </Button>
  )
}

export default SignOutButton
