import { Outlet } from 'react-router'
import NavBar from '../components/NavBar'
import { SearchBar } from './SearchBar'

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
    </div>
  )
}
