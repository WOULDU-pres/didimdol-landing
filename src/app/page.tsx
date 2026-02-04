import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Story />
      <Hero />
      <Contact />
    </main>
  );
}
