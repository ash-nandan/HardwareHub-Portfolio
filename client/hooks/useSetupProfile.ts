import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { useAuth0 } from '@auth0/auth0-react'
import { ProfilePatch } from 'models/profile'
import { useNavigate } from 'react-router'

const rootURL = new URL(`/api/v1`, document.baseURI)

export default function useSetupProfile() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (profileDetails: ProfilePatch) => {
      const token = await getAccessTokenSilently()
      const res = await request
        .patch(`${rootURL}/users`)
        .set('Authorization', `Bearer ${token}`)
        .send(profileDetails)
      return res.body
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      //team member used approach for profile component without useQuery and cache, have kept invalidate function for possible future use
      localStorage.setItem('profileComplete', 'true') //flag for profile
      navigate('/')
    },
  })
}
