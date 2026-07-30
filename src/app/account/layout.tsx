import { getAuthUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authUser = await getAuthUser()
  if (!authUser) {
    redirect('/auth/login')
  }

  return <>{children}</>
}
