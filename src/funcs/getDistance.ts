type paramType = number | undefined;

export default function getDistance(
  lat1: paramType,
  lat2: paramType,
  lon1: paramType,
  lon2: paramType
) {
  if (lat1 && lat2 && lon1 && lon2) {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 3956;

    return (c * r).toFixed(1);
  } else {
    return 'Nan';
  }
}
