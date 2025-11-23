import type { Metadata } from "next"
import ProductionBackstageContent from "@/components/production-backstage-content"

export const metadata: Metadata = {
  title: "Production & Backstage Professionals | Abhinayपथ",
  description: "Meet the skilled production and backstage professionals of the Abhinayपथ community",
}

export default function ProductionBackstagePage() {
  return <ProductionBackstageContent />
}
