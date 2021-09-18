axios.get('/friends', {
    headers: {
      Authorization: ('Bearer ', localStorage.getItem("token"))
    },
  })
  .then(function (response) {
    var friends = ''
    for (i = 0; i < response.data.length; i++) 
    {
      id = response.data[i]._id
      friends += `<div class="row-8">
      <button id="${id}" class="card" onclick="openClick(event)" value="${response.data[i].name}"><h4>${response.data[i].name}</h4></button>
      </div><br>`
    }
    console.log(response.data[0].owner)
    document.getElementById('friends').innerHTML = friends
    document.getElementById('chatHeader').innerHTML = response.data[0].name
    document.getElementById('ownerId').innerHTML = response.data[0].owner
  })
  .catch(function (error) {
    console.log(error)
  });

  function openClick(e) {
    var cards = document.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
            cards[i].className = cards[i].className.replace(" active", "");
        }
    e.currentTarget.className += " active";
    document.getElementById('chatHeader').innerHTML = e.currentTarget.getAttribute('value')

axios.get('/chatList', {
  headers: {
    Authorization: ('Bearer ', localStorage.getItem("token"))
  },
})
.then(function (response) {
  var chat = ''
  friendId = document.getElementsByClassName('active')[0].id
  for (i = 0; i < response.data.length; i++) 
  {
    if(response.data[i].sender == 'test@test.com' && response.data[i].receiver == friendId) {
      chat += `<div class="chat-panel" id=${i}><h3>${response.data[i].message}</h3></div>`
    }
    else if(response.data[i].sender == friendId && response.data[i].receiver == 'test@test.com'){
      chat += `<div class="chat-panel" id=${i}><h3>${response.data[i].message}</h3></div>`
    }
  }
  document.getElementById('chatBody').innerHTML = chat
})
.catch(function (error) {
  console.log(error)
});
}

function chatUser() {
  const receiver = document.getElementsByClassName('active')[0].id
  const message = document.getElementById("message").value
  axios.post('/chat', {
    friend: receiver,
    message: message
  }, {
    headers: {
      Authorization : ('Bearer ', localStorage.getItem("token"))
    }})
    .then(function (response) {
      console.log(response)
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
}

function logOut() {
    console.log(localStorage.getItem("token"))
    axios.post('/reg/logout', {
    },
      {
      headers: {
        Authorization : ('Bearer ', localStorage.getItem("token"))
      }
    }).then((response) => {
      console.log("Logged Out")
      localStorage.removeItem("token");
      location.replace('http://localhost:3000/')
    }).catch ((error) => {
      console.log(error)
      console.log(localStorage.getItem("token"))
    })
  }