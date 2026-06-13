import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { BallisticProfile, BallisticPoint } from "../data/ballistics";
import { getSortedPoints } from "../utils/interpolation";

type PracticeModeProps = {
  profile: BallisticProfile;
};

function chooseQuestion(points: BallisticPoint[]) {
  const sortedPoints = getSortedPoints(points);
  const randomIndex = Math.floor(Math.random() * sortedPoints.length);

  return sortedPoints[randomIndex];
}

function formatDeviation(value: number) {
  return Number(value.toFixed(1));
}

export function PracticeMode({ profile }: PracticeModeProps) {
  const [question, setQuestion] = useState(() => chooseQuestion(profile.points));
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const correctAnswer = useMemo(
    () => formatDeviation(question.deviationCm),
    [question],
  );

  useEffect(() => {
    setQuestion(chooseQuestion(profile.points));
    setAnswer("");
    setResult(null);
  }, [profile]);

  const askNewQuestion = () => {
    setQuestion(chooseQuestion(profile.points));
    setAnswer("");
    setResult(null);
  };

  const checkAnswer = () => {
    const numericAnswer = Number(answer);

    if (!Number.isFinite(numericAnswer)) {
      setResult("wrong");
      return;
    }

    setResult(Math.abs(numericAnswer - correctAnswer) <= 1 ? "correct" : "wrong");
  };

  return (
    <section className="practicePanel" aria-label="מצב תרגול">
      <div className="practiceHeader">
        <div>
          <span>תרגול לפי הפרופיל הנבחר</span>
          <strong>
            {profile.weapon} / {profile.sight}
          </strong>
        </div>
        <button type="button" className="iconButton" onClick={askNewQuestion}>
          <RefreshCw aria-hidden="true" size={18} />
          <span>שאלה חדשה</span>
        </button>
      </div>

      <p className="question">מה הסטייה בטווח {question.rangeMeters} מטר?</p>

      <label className="field">
        <span>תשובה בסנטימטרים</span>
        <input
          inputMode="decimal"
          type="number"
          step="0.1"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="לדוגמה: 6.5"
        />
      </label>

      <button type="button" className="primaryButton" onClick={checkAnswer}>
        בדוק
      </button>

      {result === "correct" && <p className="practiceResult ok">נכון</p>}
      {result === "wrong" && (
        <p className="practiceResult error">
          לא מדויק. התשובה הנכונה היא {correctAnswer} ס״מ.
        </p>
      )}

      <p className="practiceNote">
        במצב תרגול נבחרים רק טווחים מקוריים מהטבלה.
      </p>
    </section>
  );
}
