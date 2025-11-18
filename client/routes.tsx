import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Playground from './components/Playground.tsx'
import { SingleListing } from './components/SingleListing.tsx'
import { CreateListing } from './components/CreateListing.tsx'

export default createRoutesFromElements(
  <>
    <Route index element={<App />} />

    <Route path="playground" element={<Playground />} />
    <Route path="listings" />
    <Route path="listings/:id" element={<SingleListing />} />
    <Route path="listings/create" element={<CreateListing />} />
  </>,
)
