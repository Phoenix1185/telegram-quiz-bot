import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw, Star } from "lucide-react";

interface FinalScoreProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function FinalScore({ score, total, onRestart }: FinalScoreProps) {
  const percentage = Math.round((score / total) * 100);
  
  const getMessage = () => {
    if (percentage >= 90) return { text: "Outstanding! 🎉", color: "text-green-600" };
    if (percentage >= 70) return { text: "Great job! 👏", color: "text-blue-600" };
    if (percentage >= 50) return { text: "Good effort! 💪", color: "text-yellow-600" };
    return { text: "Keep learning! 📚", color: "text-orange-600" };
  };
  
  const message = getMessage();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Quiz Complete!
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-center space-y-6">
        <div className="space-y-2">
          <div className="text-4xl font-bold text-gray-900">
            {score}/{total}
          </div>
          <div className="text-xl text-gray-600">
            {percentage}% Correct
          </div>
          <div className={`text-lg font-semibold ${message.color}`}>
            {message.text}
          </div>
        </div>

        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < Math.floor(percentage / 20)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="pt-4 border-t">
          <Button 
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}