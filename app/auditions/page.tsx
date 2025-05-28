import { Suspense } from "react";
import AuditionsContent from "@/components/auditions-content";

// Fetch data on the server side
async function getAuditions() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auditions`, {
      cache: "no-store", // ensures fresh data on every request
    });

    

    if (!res.ok) {
      console.error("Failed to fetch auditions", res.status, res.statusText);
      throw new Error("Failed to fetch auditions");
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid auditions data received");
    }

    return data;
  } catch (error) {
    console.error("Error fetching auditions:", error);
    return [];
  }
}

export default async function AuditionsPage() {
  const initialAuditions = await getAuditions();

  return (
    <Suspense fallback={<div className="container py-12">Loading auditions...</div>}>
      <AuditionsContent initialAuditions={initialAuditions} />
    </Suspense>
  );
}
