import { createRoutesFromElements, Route } from 'react-router'
import Playground from './components/Playground.tsx'
import { SingleListing } from './components/SingleListing.tsx'
import { CreateListing } from './components/CreateListing.tsx'
import ProfilePage from './components/Profile.tsx'
import { RecentListings } from './components/RecentListings.tsx'
import Layout from './components/Layout.tsx'
import { UserBids } from './components/UserBids.tsx'
import { EditListing } from './components/EditListing.tsx'
import { SearchResults } from './components/SearchResults.tsx'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<RecentListings />} />
      <Route path="playground" element={<Playground />} />
      <Route path="listings" />
      <Route path="listings/create" element={<CreateListing />} />
      <Route path="listings/:id" element={<SingleListing />} />
      <Route path="listings/:id/edit" element={<EditListing />} />
      <Route path="search/results" element={<SearchResults />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="bids/:id" element={<UserBids />} />
    </Route>
  </>,
)
