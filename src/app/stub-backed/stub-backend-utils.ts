import { Request, RequestMethod } from '@angular/http';

const REGEXP_UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export function logRequest(request: Request) {
  console.log(RequestMethod[request.method], request.url);
}

export function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getUuidFromUrl(url: string) {
  let match = url.match(REGEXP_UUID);

  return match ? match[0] : '';
}
