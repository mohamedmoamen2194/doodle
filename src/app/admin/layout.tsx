import AdminSidebar from '@/components/admin/AdminSidebar'
import { getAuthUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Admin | Doodle Stationery',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authUser = await getAuthUser()
  if (!authUser || authUser.role !== 'admin') {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen bg-[#170b10]">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  )
}
