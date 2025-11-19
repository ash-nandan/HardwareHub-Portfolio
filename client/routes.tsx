import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Playground from './components/Playground.tsx'
import { SingleListing } from './components/SingleListing.tsx'
import ProfilePage from './components/Profile.tsx'

export default createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="playground" element={<Playground />} />
    <Route path="listings" />
    <Route path="listings/:id" element={<SingleListing />} />
    <Route path="/profile" element={<ProfilePage />} />
  </>,
)
