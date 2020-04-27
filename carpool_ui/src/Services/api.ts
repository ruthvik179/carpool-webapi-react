export async function post(url : string, data : any) {
    const res = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken,
    },
    body: JSON.stringify(data)
    });
    return await res.json();
  }
  export async function postWithoutAuth(url : string, data : any) {
    const res = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    });
    return await res.json();
  }
  export async function put(url : string, data : any) {
    const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken,
    },
    body: JSON.stringify(data)
    });
    return await res.json();
  }

  export async function get(url : string){
    const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken,
    },
    });
    return await res.json();
  }