import type { Metadata } from "next"
import TheatreArtistsContent from "./content"

export const metadata: Metadata = {
  title: "Theatre Artists | Abhinayपथ",
  description: "Meet the talented theatre artists of the Abhinayपथ community",
}

export default function TheatreArtistsPage() {
  return <TheatreArtistsContent />
}
