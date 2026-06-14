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

function getHermiteEstimate(
  points: BallisticPoint[],
  segmentIndex: number,
  rangeMeters: number,
) {
  const pointBefore = points[Math.max(segmentIndex - 1, 0)];
  const pointStart = points[segmentIndex];
  const pointEnd = points[segmentIndex + 1];
  const pointAfter = points[Math.min(segmentIndex + 2, points.length - 1)];

  const segmentWidth = pointEnd.rangeMeters - pointStart.rangeMeters;
  const t = (rangeMeters - pointStart.rangeMeters) / segmentWidth;
  const t2 = t * t;
  const t3 = t2 * t;

  const startSlope =
    (pointEnd.deviationCm - pointBefore.deviationCm) /
    (pointEnd.rangeMeters - pointBefore.rangeMeters || segmentWidth);
  const endSlope =
    (pointAfter.deviationCm - pointStart.deviationCm) /
    (pointAfter.rangeMeters - pointStart.rangeMeters || segmentWidth);

  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;

  return (
    h00 * pointStart.deviationCm +
    h10 * segmentWidth * startSlope +
    h01 * pointEnd.deviationCm +
    h11 * segmentWidth * endSlope
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
        deviationCm: getHermiteEstimate(sortedPoints, index, rangeMeters),
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
