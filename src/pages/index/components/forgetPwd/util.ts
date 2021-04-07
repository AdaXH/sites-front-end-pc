export function validateObj(obj: any) {
  return Object.keys(obj).some((key) => !obj[key].trim());
}
