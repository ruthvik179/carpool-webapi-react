export class ApiConnection
{
    async post(url : string, data : any) {
    const res = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken,
    },
    body: JSON.stringify(data)
    })
    console.log(res);
    return await res.json();
  }
    async postWithoutAuth(url : string, data : any) {
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
    async put(url : string, data : any) {
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

    async get(url : string){
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
}