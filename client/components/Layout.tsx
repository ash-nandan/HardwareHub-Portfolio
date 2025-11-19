import { Outlet } from 'react-router'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <div>
        <header>
            <NavBar />
        </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
