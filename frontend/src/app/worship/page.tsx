import WorshipSection from "@/components/sections/Worship";
import PageHeader from "@/components/ui/PageHeader";

export default function WorshipPage() {
    return (
        <div className="pt-0">
            <PageHeader
                title="Worship"
                subtitle="Lift your voice in praise and adoration."
            />
            <WorshipSection />
        </div>
    );
}
