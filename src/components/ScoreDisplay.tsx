import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  total: number;
}

export function ScoreDisplay({ score, total }: ScoreDisplayProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Score</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">
              {score}/{total}
            </div>
            <div className="text-sm text-blue-600">{percentage}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}