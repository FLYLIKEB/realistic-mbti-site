"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { questions } from "@/data/questions"
import { typeDescriptions } from "@/data/typeDescriptions"
import { compatibilityMap } from "@/data/compatibility"

// 타입 정의
type Category = '금전' | '지성' | '외모' | '성격';
type Responses = Record<number, number>;
type ResultType = string;

// 상수
const CATEGORIES: Category[] = ['금전', '지성', '외모', '성격'];
const THRESHOLD_SCORE = 3;

// 커스텀 훅
const useTestState = () => {
  const [startTest, setStartTest] = useState(false);
  const [responses, setResponses] = useState<Responses>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  return {
    startTest,
    setStartTest,
    responses,
    setResponses,
    currentIndex,
    setCurrentIndex,
    showResult,
    setShowResult,
  };
};

// 컴포넌트 분리
const StartScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="text-center py-12">
    <div className="text-5xl mb-6">💘</div>
    <h1 className="text-3xl font-bold text-purple-800 mb-4">당신의 결핍은? 현실 연애 MBTI</h1>
    <p className="text-gray-700 text-lg leading-relaxed max-w-md mx-auto">
      &ldquo;돈이 없어서, 못생겨서, 예민해서 연애가 어려운 걸까?&rdquo;
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
      <div className="mt-2">
        이 테스트는 MBTI와 결핍 이론을 결합하여 현대 사회의 연애 패턴을 분석합니다.
        경제적 안정감, 지적 자존감, 외모 인식, 성격 유형이 연애 관계에 미치는 영향을 연구한 결과를 바탕으로 제작되었습니다.
      </div>
    </details>
    <Button onClick={onStart} className="mt-8 px-10 py-3 bg-purple-400 text-white rounded-md hover:bg-purple-700 transition">
      시작하기
    </Button>
  </div>
);

const QuestionScreen: React.FC<{
  currentQuestion: typeof questions[0];
  currentIndex: number;
  onChoice: (index: number) => void;
  onBack: () => void;
}> = ({ currentQuestion, currentIndex, onChoice, onBack }) => (
  <div className="bg-white rounded-lg shadow-md p-8 border border-pink-100 transition-transform hover:shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <Button
        onClick={onBack}
        className="text-gray-600 hover:text-purple-600 transition-colors"
      >
        ← 뒤로가기
      </Button>
      <p className="font-medium text-gray-800 text-lg">{currentIndex + 1}. 다음 중 더 공감되는 문장을 골라주세요.</p>
    </div>
    {currentQuestion.options.map((option, index) => (
      <Button
        key={index}
        onClick={() => onChoice(index)}
        className="w-full mb-3 text-base py-6 hover:bg-purple-50 hover:border-purple-500 transition-all duration-200 border-2 text-gray-900 bg-white"
      > 
        {option}
      </Button>
    ))}
    <div className="mt-8 text-sm text-gray-600 text-center">
      문항 {currentIndex + 1} / {questions.length}
      <div className="w-full h-2 bg-purple-100 rounded-full mt-3">
        <div
          className="h-2 bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const ResultScreen: React.FC<{
  resultType: ResultType;
  onReset: () => void;
}> = ({ resultType, onReset }) => (
  <div className="text-center py-12 px-4">
    <h2 className="text-3xl font-bold text-purple-800 mb-6">당신의 결핍은? 현실 연애 MBTI</h2>
    <p className="text-5xl mt-6 text-purple-900 font-bold">{resultType}</p>
    <div className="text-7xl mt-8">
      {typeDescriptions[resultType]?.match(/^([⌚-🧿-􏰀-])/u)?.[0] || "💡"}
    </div>
    <p className="mt-8 text-xl text-gray-700 leading-relaxed whitespace-pre-line max-w-2xl mx-auto">{typeDescriptions[resultType]}</p>
    <p className="mt-6 text-lg text-gray-600 leading-relaxed whitespace-pre-line max-w-2xl mx-auto">
      💡 결핍에도 장점은 존재합니다.
      금전적 결핍은 검소함과 현실 감각을, 지적 열등감은 감성적 직관과 공감 능력을,
      외모 콤플렉스는 내면의 가치에 대한 집중을, 감정적 민감성은 깊은 감정 이해와 섬세함을 키우는 자산이 될 수 있어요.
    </p>
    <div className="mt-8">
      <p className="text-xl text-gray-800 font-semibold mb-4">✅ 잘 맞는 유형</p>
      <ul className="text-base text-gray-700 space-y-2 max-w-md mx-auto">
        {compatibilityMap[resultType]?.good.map((type) => (
          <li key={type} className="bg-purple-50 p-3 rounded-lg">
            💘 <strong>{type}</strong>: {typeDescriptions[type]?.split('💘')[1]?.trim() || '...'}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-8">
      <p className="text-xl text-gray-800 font-semibold mb-4">❌ 충돌이 잦은 유형</p>
      <ul className="text-base text-gray-700 space-y-2 max-w-md mx-auto">
        {compatibilityMap[resultType]?.bad.map((type) => (
          <li key={type} className="bg-red-50 p-3 rounded-lg">
            ⚡ <strong>{type}</strong>: {typeDescriptions[type]?.split('💘')[1]?.trim() || '...'}
          </li>
        ))}
      </ul>
    </div>
    <Button
      onClick={onReset}
      className="mt-10 px-8 py-4 bg-purple-400 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 text-lg"
    >
      처음으로 돌아가기
    </Button>

    <details className="mt-12">
      <summary className="cursor-pointer text-xl font-semibold text-purple-700 hover:text-purple-800 transition-colors">전체 궁합표 보기</summary>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border text-base text-left">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-6 py-4 border">유형</th>
              <th className="px-6 py-4 border">잘 맞는 유형</th>
              <th className="px-6 py-4 border">충돌 유형</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(compatibilityMap).map(([type, { good, bad }]) => (
              <tr key={type} className="border-b hover:bg-purple-50 transition-colors">
                <td className="px-6 py-4 border font-semibold text-purple-800">{type}</td>
                <td className="px-6 py-4 border text-green-700">{good.join(', ')}</td>
                <td className="px-6 py-4 border text-red-600">{bad.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  </div>
);

export default function RealisticMBTITest() {
  const {
    startTest,
    setStartTest,
    responses,
    setResponses,
    currentIndex,
    setCurrentIndex,
    showResult,
    setShowResult,
  } = useTestState();

  const handleChoice = (choiceIndex: number): void => {
    const nextResponses = { ...responses, [currentIndex]: choiceIndex };
    setResponses(nextResponses);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex >= questions.length) {
      setShowResult(true);
    }
  };

  const handleBack = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setStartTest(false);
    }
  };

  const getResultType = (): ResultType => {
    const score = CATEGORIES.reduce((acc, category) => ({
      ...acc,
      [category]: 0
    }), {} as Record<Category, number>);

    questions.forEach((q, i) => {
      if (responses[i] === 0) {
        score[q.category as Category]++;
      }
    });

    return (
      (score["금전"] >= THRESHOLD_SCORE ? "P" : "R") +
      (score["지성"] >= THRESHOLD_SCORE ? "F" : "S") +
      (score["외모"] >= THRESHOLD_SCORE ? "U" : "H") +
      (score["성격"] >= THRESHOLD_SCORE ? "N" : "A")
    );
  };

  const handleReset = (): void => {
    setShowResult(false);
    setResponses({});
    setCurrentIndex(0);
    setStartTest(false);
  };

  const resultType = showResult ? getResultType() : '';

  return (
    <div id="webcrumbs" className="w-full flex justify-center">
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 font-sans">
        {!startTest ? (
          <StartScreen onStart={() => setStartTest(true)} />
        ) : showResult ? (
          <ResultScreen resultType={resultType} onReset={handleReset} />
        ) : (
          <QuestionScreen
            currentQuestion={questions[currentIndex]}
            currentIndex={currentIndex}
            onChoice={handleChoice}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}