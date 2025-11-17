import { Outlet } from 'react-router'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <div className="bg-hardware-navy flex min-h-screen flex-col text-white">
      <NavBar />
      <main className="flex-1 px-10 py-8">
        <Outlet />
      </main>
    </div>
  )
}
