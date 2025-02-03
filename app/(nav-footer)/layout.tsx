import Header from "@/components/header/top/Header";
import HeaderMenu from "@/components/header/HeaderMenu";
import Footer from "@/components/footer/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function NavAndFooter({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full">
                <Header />
                <HeaderMenu />
                <div className="h-full min-h-screen">
                    {children}
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </>
    );
};