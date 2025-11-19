import { createRoutesFromElements, Route } from 'react-router'
import Playground from './components/Playground.tsx'
import { SingleListing } from './components/SingleListing.tsx'
import ProfilePage from './components/Profile.tsx'
import { RecentListings } from './components/RecentListings.tsx'
import Layout from './components/Layout.tsx'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<RecentListings />} />

      <Route path="playground" element={<Playground />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="listings" />
      <Route path="listings/:id" element={<SingleListing />} />
    </Route>
  </>,
)
