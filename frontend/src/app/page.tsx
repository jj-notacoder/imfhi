import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import About from "@/components/sections/About";
import Leadership from "@/components/sections/Leadership";
import Worship from "@/components/sections/Worship";
import Sermons from "@/components/sections/Sermons";
import Messages from "@/components/sections/Messages";
import ServicesLocation from "@/components/sections/ServicesLocation";
import Gallery from "@/components/sections/Gallery";
import PrayerRequests from "@/components/sections/PrayerRequests";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Statement />
      <About />
      <Leadership />
      <Worship />
      <Sermons />
      <Messages />
      <ServicesLocation />
      <Gallery />
      <PrayerRequests />
    </main>
  );
}
