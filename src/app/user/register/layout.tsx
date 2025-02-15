import { AuthProvider } from '@/context/AuthProvider'
export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>

  )
}
