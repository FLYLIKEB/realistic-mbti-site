"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { questions } from "@/data/questions"
import { typeDescriptions } from "@/data/typeDescriptions"
import { compatibilityMap } from "@/data/compatibility"
import { useRouter, useSearchParams } from "next/navigation"

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

const Header = () => (
  <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl p-6 mb-8 shadow-lg transform hover:scale-[1.02] transition-all">
    <h1 className="text-center text-3xl font-black text-white drop-shadow-sm">
      💘 당신의 결핍은? 현실 연애 MBTI
    </h1>
  </div>
);

const StartScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">테스트 시작하기</h2>
    <p className="text-gray-600 mb-8">
      이 테스트는 당신의 연애 스타일과 결핍을 분석하여 현실적인 MBTI 유형을 찾아줍니다.
      약 3분 정도 소요됩니다.
    </p>
    <Button onClick={onStart} className="w-full !bg-purple-300 text-gray-800 hover:!bg-purple-700 transition">
      테스트 시작하기
    </Button>
  </div>
);

const QuestionScreen = ({ 
  currentQuestion,
  currentIndex,
  onChoice,
  onBack
}: { 
  currentQuestion: typeof questions[0];
  currentIndex: number;
  onChoice: (index: number) => void;
  onBack: () => void;
}) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <Button onClick={onBack} className="text-gray-600 hover:text-gray-900">
        ← 이전
      </Button>
      <span className="text-sm text-gray-500">
        {currentIndex + 1}/{questions.length}
      </span>
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-8">
      {currentQuestion.category} 관련 질문
    </h2>
    <div className="space-y-4">
      {currentQuestion.options.map((option: string, index: number) => (
        <Button
          key={index}
          onClick={() => onChoice(index)}
          className="w-full text-left !bg-white text-gray-800 hover:!bg-purple-100 transition"
        >
          {option}
        </Button>
      ))}
    </div>
  </div>
);

const ResultScreen = ({ 
  result, 
  onReset,
  onShare 
}: { 
  result: string;
  onReset: () => void;
  onShare: () => void;
}) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">당신의 현실 연애 MBTI</h2>
    <div className="text-4xl font-bold text-purple-600 mb-8 text-center">{result}</div>
    <div className="space-y-4">
      <Button onClick={onShare} className="w-full !bg-purple-300 text-gray-800 hover:!bg-purple-700 transition">
        결과 공유하기
      </Button>
      <Button onClick={onReset} className="w-full !bg-white text-gray-800 hover:!bg-purple-100 transition">
        처음으로 돌아가기
      </Button>
    </div>
  </div>
);

export default function RealisticMBTITest() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  // URL 파라미터에서 결과 타입을 가져오는 함수
  const getResultFromUrl = () => {
    return searchParams.get('result');
  };

  // 컴포넌트 마운트 시 URL 파라미터 확인
  useEffect(() => {
    const resultFromUrl = getResultFromUrl();
    if (resultFromUrl) {
      setShowResult(true);
      setStartTest(true);
    }
  }, []); // searchParams를 의존성 배열에서 제거

  const handleChoice = (choiceIndex: number): void => {
    const nextResponses = { ...responses, [currentIndex]: choiceIndex };
    setResponses(nextResponses);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex >= questions.length) {
      const result = getResultType();
      setShowResult(true);
      // URL 변경 전에 상태 업데이트
      setTimeout(() => {
        router.push(`/?result=${result}`);
      }, 0);
    }
  };

  const handleBack = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setStartTest(false);
      setShowResult(false);
      router.push('/');
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
    router.push('/');
  };

  const resultType = showResult ? (getResultFromUrl() || getResultType()) : '';

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/?result=${resultType}`;
      await navigator.clipboard.writeText(shareUrl);
      setShowResult(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl p-6">
        <Header />
        {!startTest ? (
          <StartScreen onStart={() => setStartTest(true)} />
        ) : showResult ? (
          <ResultScreen result={resultType} onReset={handleReset} onShare={handleShare} />
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