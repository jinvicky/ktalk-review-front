import Footer from "@/components/Footer";
import HeaderServer from "@/components/header/HeaderServer";
import NavBar from "@/components/navbar/Navbar";

export default function NavAndFooter({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex">
                <NavBar />
                <div className="w-full">
                    <HeaderServer />
                    <div className="h-full min-h-screen">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};