function postRequest(data, url) {
  console.log("posted");
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => { return result; })
  .catch(error => { return ':('; });
}