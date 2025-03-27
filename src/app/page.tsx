import { Suspense } from "react"
import RealisticMBTITest from "@/components/RealisticMBTITest"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">로딩 중...</div>}>
        <RealisticMBTITest />
      </Suspense>
    </main>
  )
} 