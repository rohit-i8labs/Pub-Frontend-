import Layout from "@/components/restOwner/Layout"
export default function RestaurantOwnerLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Layout>
            {children}
        </Layout>
    )
}