import type { InterpolatedDeviation } from "../utils/interpolation";

type DeviationReadoutProps = {
  reading: InterpolatedDeviation;
};

function formatDeviation(value: number) {
  return Number(value.toFixed(1));
}

export function DeviationReadout({ reading }: DeviationReadoutProps) {
  const deviation = formatDeviation(reading.deviationCm);
  const absoluteDeviation = Math.abs(deviation);

  let text = `בטווח ${reading.rangeMeters} מטר הסטייה היא 0 ס״מ - הכדור על קו האיפוס`;

  if (deviation > 0) {
    text = `בטווח ${reading.rangeMeters} מטר הסטייה היא ${deviation} ס״מ - הכדור גבוה בכ-${absoluteDeviation} ס״מ`;
  }

  if (deviation < 0) {
    text = `בטווח ${reading.rangeMeters} מטר הסטייה היא ${deviation} ס״מ - הכדור נמוך בכ-${absoluteDeviation} ס״מ`;
  }

  return (
    <section className="readout" aria-live="polite">
      <p>{text}</p>
      <small>
        {reading.isExactPoint
          ? "נקודה מקורית מהטבלה."
          : "ערך מחושב בקירוב לינארי בין נקודות הטבלה."}
      </small>
    </section>
  );
}
