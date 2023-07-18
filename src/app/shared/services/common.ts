
export async function fetchJSON<T>(url: string, options?: any): Promise<T> {
    return await fetch(url, options)
      .then(checkStatus)
      .then(res => res.json())
      .then(json => json);
}
export function fetchHTML<T>(url: string, options?: any): Promise<T|string> { // T is String
    return fetch(url, options).then((res) => res.text());
}
  
function checkStatus(response:any) {
    if (response.ok) {
      return response;
    } else {
      const error: any = new Error(response.statusText);
      error.response = response;
      return Promise.reject(error);
    }
}

