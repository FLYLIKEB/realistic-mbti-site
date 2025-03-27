import { useState } from "react"
import { Button } from "@/components/ui/button"
import { questions } from "@/data/questions"
import { typeDescriptions } from "@/data/typeDescriptions"
import { compatibilityMap } from "@/data/compatibility"

export default function RealisticMBTITest() {
  const [startTest, setStartTest] = useState(false);
  const [responses, setResponses] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleChoice = (choiceIndex) => {
    const nextResponses = { ...responses, [currentIndex]: choiceIndex }
    setResponses(nextResponses)
    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex)

    if (nextIndex >= questions.length) {
      setShowResult(true)
    }
  }

  const currentQuestion = questions[currentIndex]
  const isComplete = currentIndex >= questions.length

  const getResultType = () => {
    let score = {
      금전: 0,
      지성: 0,
      외모: 0,
      성격: 0
    }
    questions.forEach((q, i) => {
      const selected = responses[i]
      if (selected === 0) {
        score[q.category] = (score[q.category] || 0) + 1
      }
    })
    const type =
      (score["금전"] >= 3 ? "P" : "R") +
      (score["지성"] >= 3 ? "F" : "S") +
      (score["외모"] >= 3 ? "U" : "H") +
      (score["성격"] >= 3 ? "N" : "A")
    return type
  }

  const resultType = getResultType()
  const resultDescription = typeDescriptions[resultType] || "유형 정보가 없습니다."
  const resultStrength = `💡 결핍에도 장점은 존재합니다.
금전적 결핍은 검소함과 현실 감각을, 지적 열등감은 감성적 직관과 공감 능력을,
외모 콤플렉스는 내면의 가치에 대한 집중을, 감정적 민감성은 깊은 감정 이해와 섬세함을 키우는 자산이 될 수 있어요.`

  return (
    <div id="webcrumbs" className="w-full flex justify-center">
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 font-sans">
        {!startTest ? (
          <div className="text-center py-12">
  <div className="text-5xl mb-6">💘</div>
  <h1 className="text-3xl font-bold text-purple-800 mb-4">당신의 결핍은? 현실 연애 MBTI</h1>
            <p className="text-gray-700 text-lg leading-relaxed max-w-md mx-auto">
  "돈이 없어서, 못생겨서, 예민해서 연애가 어려운 걸까?"
  <br />
  진짜 이유는 당신의 결핍 속에 숨어 있습니다.
  <br /><br />
  이 테스트는 당신의 <strong className="text-purple-700">경제적 안정감</strong>, <strong className="text-purple-700">지적 자존감</strong>,
  <strong className="text-purple-700">외모 인식</strong>, <strong className="text-purple-700">성격 유형</strong>을 바탕으로 현실적인 성향을 파악합니다.
  <br /><br />
  기존 MBTI처럼 성격만 보는 것이 아니라, 사회적 현실과 자기 인식을 포함한
  더 <strong className="text-purple-700">입체적이고 솔직한 자아 탐색</strong>이 가능합니다.
  <br />
  나의 결핍과 강점을 통합적으로 이해하고 싶다면 이 테스트가 큰 도움이 될 거예요.
</p>
<ul className="text-sm text-gray-600 text-left max-w-md mx-auto mt-6 space-y-1">
  <li>✅ 4가지 현실 지표 기반 자가진단</li>
  <li>✅ 나의 결핍과 강점 분석</li>
  <li>✅ 나와 맞는 연애 궁합까지 제안!</li>
</ul>
<p className="mt-4 text-sm text-gray-500">총 문항 수: 20개 | 예상 소요 시간: 약 3분</p>
<details className="mt-4 text-xs text-gray-400">
  <summary className="cursor-pointer text-purple-600 underline">관련 연구 보기</summary>
  <div className="mt-2">관련 연구:$1</div>
</details>
            <button
              onClick={() => setStartTest(true)}
              className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              시작하기
            </button>
          </div>
        ) : showResult ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-purple-700">당신의 결핍은? 현실 연애 MBTI</h2>
            <p className="text-4xl mt-4 text-purple-900">{resultType}</p>
            <div className="text-6xl mt-6">
  {resultDescription.match(/^([⌚-🧿�-􏰀-�])/u)?.[0] || "💡"}
</div>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed whitespace-pre-line">{resultDescription}</p>
            <p className="mt-4 text-base text-gray-600 leading-relaxed whitespace-pre-line">{resultStrength}</p>
            <p className="mt-6 text-base text-gray-800 font-semibold">✅ 잘 맞는 유형</p>
<ul className="text-sm text-gray-700 mt-1 space-y-1">
  {compatibilityMap[resultType]?.good.map((type) => (
    <li key={type}>
      💘 <strong>{type}</strong>: {typeDescriptions[type]?.split('💘')[1]?.trim() || '...'}
    </li>
  ))}
</ul>

<p className="mt-4 text-base text-gray-800 font-semibold">❌ 충돌이 잦은 유형</p>
<ul className="text-sm text-gray-700 mt-1 space-y-1">
  {compatibilityMap[resultType]?.bad.map((type) => (
    <li key={type}>
      ⚡ <strong>{type}</strong>: {typeDescriptions[type]?.split('💘')[1]?.trim() || '...'}
    </li>
  ))}
</ul>
            <button
              className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              onClick={() => {
                setShowResult(false)
                setResponses({})
                setCurrentIndex(0)
                setStartTest(false)
              }}
            >
              처음으로 돌아가기
            </button>

<details className="mt-10">
  <summary className="cursor-pointer text-lg font-semibold text-purple-700">전체 궁합표 보기</summary>
  <div className="overflow-x-auto mt-4">
    <table className="min-w-full border text-sm text-left">
      <thead className="bg-purple-100">
        <tr>
          <th className="px-4 py-2 border">유형</th>
          <th className="px-4 py-2 border">잘 맞는 유형</th>
          <th className="px-4 py-2 border">충돌 유형</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(compatibilityMap).map(([type, { good, bad }]) => (
          <tr key={type} className="border-b">
            <td className="px-4 py-2 border font-semibold text-purple-800">{type}</td>
            <td className="px-4 py-2 border text-green-700">{good.join(', ')}</td>
            <td className="px-4 py-2 border text-red-600">{bad.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</details>
          </div>
        ) : isComplete ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-purple-700">테스트가 완료되었습니다!</h2>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 border border-pink-100 transition-transform">
                        <p className="font-medium text-gray-800 mb-3">{currentIndex + 1}. 다음 중 더 공감되는 문장을 골라주세요.</p>
            {currentQuestion.options.map((option, index) => (
  <Button
    key={index}
    onClick={() => handleChoice(index)}
    className="w-full mb-2 text-base"
    variant="outline"
  >
    {option}
  </Button>
))}

<div className="mt-6 text-sm text-gray-600 text-center">
  문항 {currentIndex + 1} / {questions.length}
  <div className="w-full h-2 bg-purple-100 rounded-full mt-2">
    <div
      className="h-2 bg-purple-500 rounded-full transition-all duration-300"
      style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
    ></div>
  </div>
</div>
          </div>
        )}
      </div>
    </div>
  )
}
