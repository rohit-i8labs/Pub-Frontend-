import Layout from "@/components/user/Layout"
import { SocketProvider } from '@/context/(user)/SocketContext'
import { ChatProvider } from '@/context/(user)/ChatProvider'
import { CustomerAuthProvider } from '@/context/(user)/CustomerAuthProvider'
export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <CustomerAuthProvider>
            <SocketProvider>
                <ChatProvider>
                    <Layout>
                        {children}
                    </Layout>
                </ChatProvider>
            </SocketProvider>
        </CustomerAuthProvider>
    )
}