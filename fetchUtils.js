

export async function handleHttpErrors(res) {
  if (!res.ok) {
   const errorResponse = await res.json();
   const error = new Error(errorResponse.message)
   error.fullResponse = errorResponse
   throw error
 }
 return res.json()
}


export function makeOptions(method, body, addToken) {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
   if (addToken && localStorage.getItem("token")) {
    opts.headers.Authorization = "Bearer " + localStorage.getItem("token")
  }

  return opts;
}
