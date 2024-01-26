import { Login, Logout } from '@mui/icons-material'
import { auth } from './firebase/firebase'
import { redirect } from 'next/navigation'

export default function Home() {
  if (!auth.currentUser) {
    redirect('/login')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login />
      <Logout />
    </main>
  )
}
