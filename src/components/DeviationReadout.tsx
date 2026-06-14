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

  let status = "הכדור פוגע בנקודת המכוון";

  if (deviation > 0) {
    status = `הכדור פוגע כ-${absoluteDeviation} ס״מ מעל נקודת המכוון`;
  }

  if (deviation < 0) {
    status = `הכדור פוגע כ-${absoluteDeviation} ס״מ מתחת לנקודת המכוון`;
  }

  return (
    <section className="readout" aria-live="polite">
      <div className="readoutGrid">
        <div className="metricWindow">
          <span>בטווח</span>
          <strong>{reading.rangeMeters}</strong>
          <small>מטר</small>
        </div>
        <div className="metricWindow">
          <span>הסטייה היא</span>
          <strong>{deviation}</strong>
          <small>ס״מ</small>
        </div>
      </div>
      <div className="readoutStatus">
        <span>{status}</span>
      </div>
    </section>
  );
}
