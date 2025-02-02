import SideNav from "@/components/my-page/SideNav";

export default function MyPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex">
                <SideNav />
                <div>
                    {children}
                </div>
            </div>
        </>
    );
};