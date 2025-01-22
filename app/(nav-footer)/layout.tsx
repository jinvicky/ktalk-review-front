import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";

export default function NavAndFooter({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
};