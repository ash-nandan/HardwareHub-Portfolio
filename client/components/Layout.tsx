import { Outlet } from 'react-router'
import NavBar from '../components/NavBar'
import { SearchBar } from './SearchBar'
import { Toaster } from '@/components/ui/toaster'

export default function Layout() {
  return (
    <div>
      <header>
        <NavBar />
        <SearchBar />
      </header>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
