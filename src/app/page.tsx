import { LandingPage } from "@/components/landing/landing-page";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <>
      <LandingPage />
      <Analytics />
    </>
  );
}
