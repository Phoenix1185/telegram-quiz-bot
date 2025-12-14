import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Question } from "../utils/quizData";

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizCard({ 
  question, 
  onAnswer, 
  onNext, 
  questionNumber, 
  totalQuestions 
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;
    
    setSelectedOption(index);
    setShowFeedback(true);
    const isCorrect = index === question.correct;
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    onNext();
  };

  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      return "bg-white hover:bg-gray-50 border-gray-200 text-gray-900";
    }
    
    if (index === question.correct) {
      return "bg-green-50 border-green-300 text-green-900";
    }
    
    if (index === selectedOption && index !== question.correct) {
      return "bg-red-50 border-red-300 text-red-900";
    }
    
    return "bg-gray-50 border-gray-200 text-gray-500";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <CardTitle className="text-xl text-gray-900 leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`justify-start h-auto p-4 text-left whitespace-normal transition-all ${getOptionStyle(index)}`}
              onClick={() => handleOptionClick(index)}
              disabled={showFeedback}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1">{option}</span>
                {showFeedback && index === question.correct && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showFeedback && index === selectedOption && index !== question.correct && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </Button>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                selectedOption === question.correct ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {selectedOption === question.correct ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <span className="text-yellow-600 text-sm font-bold">!</span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  {selectedOption === question.correct ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {showFeedback && (
          <Button 
            onClick={handleNext}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Next Question
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}