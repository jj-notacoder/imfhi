import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-primary font-sans text-gray-900 dark:text-gray-100 selection:bg-accent selection:text-white">
            <Navbar />
            <main className="flex-grow w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}
