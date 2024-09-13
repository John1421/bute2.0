import Hero from "@/components/Hero";

export const isProduction = process.env.NODE_ENV === "production";
export default async function Home() {
  return <>
    <Hero />    
  </>
}