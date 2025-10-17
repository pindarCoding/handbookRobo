import Image from "next/image";

import HandbookNavigator from "@/components/handbook/HandbookNavigator";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HandbookNavigator />
      <Image
        src="/images/generations.png"
        alt="Generations"
        width={400}
        height={250}
        className="hidden lg:block absolute bottom-0 right-4"
      />
    </main>
  );
}
