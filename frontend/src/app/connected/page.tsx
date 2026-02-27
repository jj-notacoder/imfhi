import PrayerRequests from "@/components/sections/PrayerRequests";
import PageHeader from "@/components/ui/PageHeader";

export default function ConnectedPage() {
    return (
        <div className="pt-0">
            <PageHeader
                title="Get Connected"
                subtitle="We would love to hear from you."
            />
            <PrayerRequests />
        </div>
    );
}
