import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin | Doodle Stationery',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#170b10]">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  )
}
