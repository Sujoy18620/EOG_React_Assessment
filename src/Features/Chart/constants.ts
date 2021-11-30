export const measurementQuery = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

export const subscriptionQuery = `subscription {
  newMeasurement{
    metric,
    at,
    value,
    unit
  }
}`;