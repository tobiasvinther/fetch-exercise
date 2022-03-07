document.getElementById("btn-get").onclick = getUser

function getUser() {
  document.getElementById("id-error").innerText = "" //reset error message
  const id = document.getElementById("input-id").value

  fetch("https://jsonplaceholder.typicode.com/users/" + id)
  .then(res => {
    if (!res.ok) {
      return Promise.reject("Error :" + res.status) //error handling
    }
    return res.json() //get it as json
  })
  .then(data => { //now we have the data as json and we can start to use it
    document.getElementById("id-name").innerText = data.name
    document.getElementById("id-phone").innerText = data.phone
    document.getElementById("id-street").innerText = data.address.street
    document.getElementById("id-city").innerText = data.address.city
  })
  .catch(err => {
    document.getElementById("id-error").innerText = "User doesn't exist"
    console.error("UPPPPPS: " + err)
  }) //catch errors
  .finally(e => console.log("Finally Done"))
}

document.getElementById("btn-get-all").onclick = getAllUsers

function getAllUsers() {
  fetch("https://jsonplaceholder.typicode.com/users/")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const rows = data.map(user => 
    `
    <tr>
      <td>${encode(user.name)}</td>
      <td>${encode(user.phone)}</td>
      <td>${encode(user.address.street)}</td>
      <td>${encode(user.address.city)}</td>
    </tr>
    `
    ).join("\n")
    document.getElementById("tbl-body").innerHTML = rows
  })
  .catch(err => console.error("UPPPPPS: " + err))
  .finally(e => console.log("Finally Done"))
}

/**
 * The encoder method we have used when inserting untrusted data via the innerHTML property
 * Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
 * @param {str} str
 * @returns the encode string
 */
 export function encode(str) {
  let encoded = "" + str
  encoded = encoded.replace(/&/g, "&amp;");
  encoded = encoded.replace(/>/g, "&gt;");
  encoded = encoded.replace(/</g, "&lt;");
  encoded = encoded.replace(/"/g, "&quot;");
  encoded = encoded.replace(/'/g, "&#039;");
  return encoded;
}


/*
const options = {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    },
    body: JSON.stringify(
        {
        "name": "Eric"
        }
    )
}

fetch("https://jsonplaceholder.typicode.com/users/", options)
    .then(res => {
        console.log(res.status)
        return res.json()
    })
    .then(data => console.log(data))
    .catch(err => console.error("That was an error: " + err))
    .finally(() => console.log("Done"))
*/

/*
fetch("https://jsonplaceholder.typicode.com/users/111")
  .then(res => {
    if (!res.ok) {
      return Promise.reject("Error :" + res.status)
    }
    return res.json()
  })
  .then(data => console.log(data))
  .catch(err => console.error("UPPPPPS: " + err))
  .finally(e => console.log("Finally Done"))
  */
