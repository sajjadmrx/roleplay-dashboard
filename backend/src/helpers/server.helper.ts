import moment from 'moment-jalaali'
export function removeScriptTags(html: string): string {
  if (!html) return "";
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}


export function convertStringToBoolean(str: string): boolean {
  if (!str)
    return false;

  return str.toLowerCase() == 'on' ? true : false;
}


export function getNowDateJalali(): string {
  return moment().locale('fa').format('jYYYY/jM/jD');
}