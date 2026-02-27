import MinistriesSection from "@/components/sections/Ministries";
import PageHeader from "@/components/ui/PageHeader";

export default function MinistriesPage() {
    return (
        <div className="pt-0">
            <PageHeader
                title="Ministries"
                subtitle="There is a place for everyone to serve and grow."
            />
            <MinistriesSection />
        </div>
    );
}
