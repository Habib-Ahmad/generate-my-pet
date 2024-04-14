import { Heading } from "@radix-ui/themes";
import { Wrapper } from "@/components";

export default function Home() {
  return (
    <main className="px-[5vw] md:px-[10vw] py-16">
      <Heading className="text-center text-4xl mb-10">Generate my Pet</Heading>

      <Wrapper />
    </main>
  );
}
