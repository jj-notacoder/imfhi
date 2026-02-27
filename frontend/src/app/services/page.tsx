import ServicesLocation from "@/components/sections/ServicesLocation";
import PageHeader from "@/components/ui/PageHeader";

export default function ServicesPage() {
    return (
        <div className="pt-0">
            <PageHeader
                title="Services"
                subtitle="We gather weekly to worship Jesus."
            />
            <ServicesLocation />
        </div>
    );
}
