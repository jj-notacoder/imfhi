import AboutSection from "@/components/sections/About";
import PageHeader from "@/components/ui/PageHeader";

export default function AboutPage() {
    return (
        <div className="pt-0">
            <PageHeader
                title="Our Story"
                subtitle="Rooted in Love, Growing in Faith."
            />
            <AboutSection />
        </div>
    );
}
