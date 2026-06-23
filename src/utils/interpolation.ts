import type { BallisticPoint } from "../data/ballistics";

export type InterpolatedDeviation = {
  rangeMeters: number;
  deviationCm: number;
  isExactPoint: boolean;
};

export function getSortedPoints(points: BallisticPoint[]) {
  return [...points].sort((a, b) => a.rangeMeters - b.rangeMeters);
}

function getQuadraticEstimate(points: BallisticPoint[], rangeMeters: number) {
  const [firstPoint, secondPoint, thirdPoint] = points;

  if (!firstPoint || !secondPoint || !thirdPoint) {
    return firstPoint?.deviationCm ?? 0;
  }

  const x = rangeMeters;
  const x1 = firstPoint.rangeMeters;
  const x2 = secondPoint.rangeMeters;
  const x3 = thirdPoint.rangeMeters;
  const y1 = firstPoint.deviationCm;
  const y2 = secondPoint.deviationCm;
  const y3 = thirdPoint.deviationCm;

  const firstTerm = y1 * ((x - x2) * (x - x3)) / ((x1 - x2) * (x1 - x3));
  const secondTerm = y2 * ((x - x1) * (x - x3)) / ((x2 - x1) * (x2 - x3));
  const thirdTerm = y3 * ((x - x1) * (x - x2)) / ((x3 - x1) * (x3 - x2));

  return firstTerm + secondTerm + thirdTerm;
}

function getLinearEstimate(
  pointBefore: BallisticPoint,
  pointAfter: BallisticPoint,
  rangeMeters: number,
) {
  return (
    pointBefore.deviationCm +
    ((rangeMeters - pointBefore.rangeMeters) *
      (pointAfter.deviationCm - pointBefore.deviationCm)) /
      (pointAfter.rangeMeters - pointBefore.rangeMeters)
  );
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
    const estimatedRange = Math.max(0, rangeMeters);

    return {
      rangeMeters: estimatedRange,
      deviationCm:
        estimatedRange === firstPoint.rangeMeters
          ? firstPoint.deviationCm
          : getQuadraticEstimate(sortedPoints, estimatedRange),
      isExactPoint: estimatedRange === firstPoint.rangeMeters,
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
      return {
        rangeMeters,
        deviationCm: getLinearEstimate(pointBefore, pointAfter, rangeMeters),
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
  const lastPoint = sortedPoints[sortedPoints.length - 1];

  return Math.min(
    Math.max(Math.round(rangeMeters), 0),
    lastPoint.rangeMeters,
  );
}

export function buildInterpolatedSeries(points: BallisticPoint[]) {
  const sortedPoints = getSortedPoints(points);
  const lastPoint = sortedPoints[sortedPoints.length - 1];
  const series: InterpolatedDeviation[] = [];

  for (
    let rangeMeters = 0;
    rangeMeters <= lastPoint.rangeMeters;
    rangeMeters += 1
  ) {
    series.push(getInterpolatedDeviation(sortedPoints, rangeMeters));
  }

  return series;
}

function getSecondZeroRange(
  points: BallisticPoint[],
  zeroRangeMeters: number,
) {
  return points.find(
    (point) =>
      point.rangeMeters > zeroRangeMeters &&
      Math.abs(point.deviationCm) < 0.0001,
  )?.rangeMeters;
}

function getBallisticCoefficient(
  points: BallisticPoint[],
  zeroRangeMeters: number,
  secondZeroRange: number,
) {
  let numerator = 0;
  let denominator = 0;

  for (const point of points) {
    const basis =
      (point.rangeMeters - zeroRangeMeters) *
      (secondZeroRange - point.rangeMeters);

    numerator += basis * point.deviationCm;
    denominator += basis * basis;
  }

  if (denominator === 0) {
    return 0;
  }

  return Math.max(numerator / denominator, 0);
}

export function getVisualCurveDeviation(
  points: BallisticPoint[],
  zeroRangeMeters: number,
  rangeMeters: number,
): InterpolatedDeviation {
  const sortedPoints = getSortedPoints(points);
  const lastPoint = sortedPoints[sortedPoints.length - 1];
  const clampedRange = Math.min(Math.max(rangeMeters, 0), lastPoint.rangeMeters);
  const secondZeroRange = getSecondZeroRange(sortedPoints, zeroRangeMeters);

  if (!secondZeroRange) {
    return getInterpolatedDeviation(sortedPoints, clampedRange);
  }

  const coefficient = getBallisticCoefficient(
    sortedPoints,
    zeroRangeMeters,
    secondZeroRange,
  );

  return {
    rangeMeters: clampedRange,
    deviationCm:
      coefficient *
      (clampedRange - zeroRangeMeters) *
      (secondZeroRange - clampedRange),
    isExactPoint: sortedPoints.some(
      (point) => point.rangeMeters === clampedRange,
    ),
  };
}

export function buildVisualCurveSeries(
  points: BallisticPoint[],
  zeroRangeMeters: number,
) {
  const sortedPoints = getSortedPoints(points);
  const lastPoint = sortedPoints[sortedPoints.length - 1];
  const series: InterpolatedDeviation[] = [];

  for (
    let rangeMeters = 0;
    rangeMeters <= lastPoint.rangeMeters;
    rangeMeters += 1
  ) {
    series.push(
      getVisualCurveDeviation(sortedPoints, zeroRangeMeters, rangeMeters),
    );
  }

  return series;
}
