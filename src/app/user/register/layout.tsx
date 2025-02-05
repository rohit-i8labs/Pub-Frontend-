import { CustomerAuthProvider } from '@/context/(user)/CustomerAuthProvider'
export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CustomerAuthProvider>
      {children}
    </CustomerAuthProvider>

  )
}
