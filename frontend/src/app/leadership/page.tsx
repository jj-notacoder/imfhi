import LeadershipSection from "@/components/sections/Leadership";
import PageHeader from "@/components/ui/PageHeader";

export default function LeadershipPage() {
    return (
        <div className="pt-0">
            <PageHeader
                title="Our Leadership"
                subtitle="Dedicated servant leaders guiding our community."
            />
            <LeadershipSection />
        </div>
    );
}
