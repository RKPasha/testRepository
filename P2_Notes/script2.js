console.log('script integrated')
var array = []
showCards()
function addNote () {
  let title = document.getElementById('title').value
  let noteTxt = document.getElementById('note').value
  let dateTime = new Date()
  if (noteTxt != '' && title != '') {
    let noteObj = {
      Title: title,
      Note: noteTxt,
      Time: dateTime
    }
    array.push(noteObj)
    document.getElementById('note').value = ''
    document.getElementById('title').value = ''
    localStorage.setItem('notes', JSON.stringify(array))
    showCards()
  } else {
    alert('Title/Notes field is Empty...!')
  }
  console.log(array)
}

function showCards () {
  if (localStorage.getItem('notes') == null) {
    array = []
  } else {
    arrayStr = localStorage.getItem('notes')
    array = JSON.parse(arrayStr)
  }

  let cards = document.getElementById('cardHolder')
  let cardsBody = ``
  if (array.length == 0) {
    cardsBody += `<h4 style="font-family: Sofia, sans-serif; text-align: center;">
        No notes Found...!😕
      </h4>`
    cards.innerHTML = cardsBody
  } else {
    array.forEach((element, index) => {
      let dateTime = new Date(element.Time)
      let date
      let time
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      date = dateTime.toLocaleDateString(undefined, options)
      time =
        dateTime.getHours() +
        ':' +
        dateTime.getMinutes() +
        ':' +
        dateTime.getSeconds()
      cardsBody += `        <div
            class="card my-3 mx-5 col-md-3"
            style="width: 18rem; background-color: #ffbcbc;"
            id="card"
          >
            <div class="card-body">
              <h5
                class="card-title"
                id="title"
                style="font-family: papyrus, cursive;"
              >
                ${element.Title} 
              </h5>
              
              <p class="card-text" id="cardText" style="font-family: Sofia, sans-serif;">
              ${element.Note}
              </p>
              <p style="font-size: small; text-align: right; font-family: papyrus, cursive;">${time +
                ' ' +
                date}</p>
              <div class="col text-center">
                <button id="delBtn" class="btn btn-danger btn-small" onclick="delNote(${index})">
                  Delete
                </button>
              </div>
            </div>
          </div>`
      cards.innerHTML = cardsBody
    })
  }
}

function delNote (index) {
  array.splice(index, 1)
  localStorage.setItem('notes', JSON.stringify(array))
  showCards()
}

let search = document.getElementById('searchTxt')
search.addEventListener('input', searchNote)

function searchNote () {
  let srch = document.getElementById('searchTxt').value
  console.log('input event fired')

  let searchArr = []
  array.forEach((element, index) => {
    //console.log(element.notes.toLowerCase().includes(search))
    if (
      element.Note.toLowerCase().search(srch.toLowerCase()) != -1 ||
      element.Note.toLowerCase() == srch.toLowerCase()
    ) {
      searchArr.push(element)
    }
  })
  console.log(searchArr)
  updateCardsBySearch(searchArr)
}

function updateCardsBySearch (searchArr) {
  let cards = document.getElementById('cardHolder')
  let cardsBody = ``
  if (searchArr.length == 0) {
    cardsBody += `<h4 style="font-family: Sofia, sans-serif; text-align: center;">
        No notes Found...!😕
      </h4>`
    cards.innerHTML = cardsBody
  } else {
    searchArr.forEach((element, index) => {
      let dateTime = new Date(element.Time)
      let date
      let time
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      date = dateTime.toLocaleDateString(undefined, options)
      time =
        dateTime.getHours() +
        ':' +
        dateTime.getMinutes() +
        ':' +
        dateTime.getSeconds()
      cardsBody += `        <div
      class="card my-3 mx-5 col-md-3"
      style="width: 18rem; background-color: #ffbcbc;"
      id="card"
    >
      <div class="card-body">
        <h5
          class="card-title"
          id="title"
          style="font-family: papyrus, cursive;"
        >
          ${element.Title} 
        </h5>
        
        <p class="card-text" id="cardText" style="font-family: Sofia, sans-serif;">
        ${element.Note}
        </p>
        <p style="font-size: small; text-align: right; font-family: papyrus, cursive;">${time +
          ' ' +
          date}</p>
        <div class="col text-center">
          <button id="delBtn" class="btn btn-danger btn-small" onclick="delNote(${index})">
            Delete
          </button>
        </div>
      </div>
    </div>`
      cards.innerHTML = cardsBody
    })
  }
}
