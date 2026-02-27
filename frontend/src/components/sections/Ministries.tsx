import { Heart, Users, BookOpen, Music, Globe, Coffee } from "lucide-react";

const ministries = [
    {
        title: "Kids Ministry",
        description: "A fun and safe environment for children to learn about Jesus.",
        icon: Heart,
    },
    {
        title: "Youth Group",
        description: "Empowering teenagers to live bold lives for Christ.",
        icon: Users,
    },
    {
        title: "Bible Study",
        description: "Deep dive into the Word of God every Wednesday night.",
        icon: BookOpen,
    },
    {
        title: "Worship Team",
        description: "Leading the congregation in praise and worship.",
        icon: Music,
    },
    {
        title: "Outreach",
        description: "Serving our local community and spreading the Gospel.",
        icon: Globe,
    },
    {
        title: "Hospitality",
        description: "Welcoming guests and creating a warm atmosphere.",
        icon: Coffee,
    },
];

export default function Ministries() {
    return (
        <section id="ministries" className="py-24 bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-sm">
                        Get Involved
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
                        Our Ministries
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-stone-600 font-sans">
                        There is a place for everyone to serve and grow. Join one of our ministries today.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ministries.map((ministry) => {
                        const Icon = ministry.icon;
                        return (
                            <div
                                key={ministry.title}
                                className="bg-white p-8 rounded-sm border border-stone-100 shadow-lg hover:shadow-2xl hover:border-[var(--color-accent)] transition-all duration-300 group hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-[var(--color-primary)]/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                                    <Icon className="w-8 h-8 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300" />
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-3">
                                    {ministry.title}
                                </h3>
                                <div className="w-8 h-[2px] bg-[var(--color-accent)] mb-4" />
                                <p className="text-stone-600 leading-relaxed font-sans">
                                    {ministry.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
