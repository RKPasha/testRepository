console.log('script integrated')
var array = []
showCards()
function addNote () {
  let note = document.getElementById('note').value
  if (note != '') {
    array.push(note)
    document.getElementById('note').value = ''
    localStorage.setItem('notes', JSON.stringify(array))
    showCards()
  } else {
    alert('Text Field is Empty...!')
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
      cardsBody += `        <div
            class="card my-3 mx-5"
            style="width: 18rem; background-color: #ffbcbc;"
            id="card"
          >
            <div class="card-body">
              <h5
                class="card-title"
                id="title"
                style="font-family: papyrus, cursive;"
              >
                ${'Note ' + (index + 1)}
              </h5>
              <p class="card-text" id="cardText">
              ${element}
              </p>
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
      element.toLowerCase().search(srch.toLowerCase()) != -1 ||
      element.toLowerCase() == srch.toLowerCase()
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
      cardsBody += `        <div
            class="card my-3 mx-5"
            style="width: 18rem; background-color: #ffbcbc;"
            id="card"
          >
            <div class="card-body">
              <h5
                class="card-title"
                id="title"
                style="font-family: papyrus, cursive;"
              >
                ${'Note ' + (index + 1)}
              </h5>
              <p class="card-text" id="cardText">
              ${element}
              </p>
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
