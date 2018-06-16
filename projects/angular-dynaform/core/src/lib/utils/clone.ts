export function clone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
  }

export function cleanValue(value: any): any {
  return JSON.parse(JSON.stringify(value, (k, v) => (v === null) ? undefined : v, 2));
}
