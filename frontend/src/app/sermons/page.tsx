import SermonsSection from "@/components/sections/Sermons";
import PageHeader from "@/components/ui/PageHeader";

export default function SermonsPage() {
    return (
        <div className="pt-0">
            <PageHeader
                title="Sermons"
                subtitle="Dive deeper into the Word with our latest teachings."
            />
            <SermonsSection />
        </div>
    );
}
