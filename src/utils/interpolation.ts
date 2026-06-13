import type { BallisticPoint } from "../data/ballistics";

export type InterpolatedDeviation = {
  rangeMeters: number;
  deviationCm: number;
  isExactPoint: boolean;
};

export function getSortedPoints(points: BallisticPoint[]) {
  return [...points].sort((a, b) => a.rangeMeters - b.rangeMeters);
}

export function getInterpolatedDeviation(
  points: BallisticPoint[],
  rangeMeters: number,
): InterpolatedDeviation {
  const sortedPoints = getSortedPoints(points);

  if (sortedPoints.length === 0) {
    return { rangeMeters, deviationCm: 0, isExactPoint: false };
  }

  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];

  if (rangeMeters <= firstPoint.rangeMeters) {
    return {
      rangeMeters: firstPoint.rangeMeters,
      deviationCm: firstPoint.deviationCm,
      isExactPoint: true,
    };
  }

  if (rangeMeters >= lastPoint.rangeMeters) {
    return {
      rangeMeters: lastPoint.rangeMeters,
      deviationCm: lastPoint.deviationCm,
      isExactPoint: true,
    };
  }

  const exactPoint = sortedPoints.find(
    (point) => point.rangeMeters === rangeMeters,
  );

  if (exactPoint) {
    return {
      rangeMeters: exactPoint.rangeMeters,
      deviationCm: exactPoint.deviationCm,
      isExactPoint: true,
    };
  }

  for (let index = 0; index < sortedPoints.length - 1; index += 1) {
    const pointBefore = sortedPoints[index];
    const pointAfter = sortedPoints[index + 1];

    if (
      rangeMeters > pointBefore.rangeMeters &&
      rangeMeters < pointAfter.rangeMeters
    ) {
      const deviationCm =
        pointBefore.deviationCm +
        ((rangeMeters - pointBefore.rangeMeters) *
          (pointAfter.deviationCm - pointBefore.deviationCm)) /
          (pointAfter.rangeMeters - pointBefore.rangeMeters);

      return {
        rangeMeters,
        deviationCm,
        isExactPoint: false,
      };
    }
  }

  return {
    rangeMeters: lastPoint.rangeMeters,
    deviationCm: lastPoint.deviationCm,
    isExactPoint: true,
  };
}

export function clampRange(points: BallisticPoint[], rangeMeters: number) {
  const sortedPoints = getSortedPoints(points);
  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];

  return Math.min(
    Math.max(Math.round(rangeMeters), firstPoint.rangeMeters),
    lastPoint.rangeMeters,
  );
}

export function buildInterpolatedSeries(points: BallisticPoint[]) {
  const sortedPoints = getSortedPoints(points);
  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];
  const series: InterpolatedDeviation[] = [];

  for (
    let rangeMeters = firstPoint.rangeMeters;
    rangeMeters <= lastPoint.rangeMeters;
    rangeMeters += 1
  ) {
    series.push(getInterpolatedDeviation(sortedPoints, rangeMeters));
  }

  return series;
}
