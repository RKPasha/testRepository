y = document.getElementById('updateBtn')
// const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
// a = new Date()
// date1 = a.toLocaleDateString(undefined, options)
// document.getElementById('date').value = date1
y.style.display = 'none'
var Uindex = 0
var list = []

function AddData () {
  let task = document.getElementById('task').value
  let date = document.getElementById('date').value
  let desc = document.getElementById('Description').value
  const vfy = document.getElementById('confirm')
  if (task != '' && desc != '' && date != '') {
    if (vfy.checked == true) {
      var obj = {
        tsk: task,
        dt: date,
        des: desc
      }
      list.push(obj)
      localStorage.setItem('itemsJson', JSON.stringify(list))
      document.getElementById('task').value = ''
      document.getElementById('date').value = ''
      document.getElementById('Description').value = ''
      document.getElementById('confirm').checked = false
      console.log(list)
      updateTable()
    } else {
      alert('Please check the confirmation box..!')
    }
  } else {
    alert('Task or Description or Date field is empty..!')
  }
}

function updateTable() {
  document.getElementById('searchItem').value = ''
  if (localStorage.getItem('itemsJson') == null) {
    list = []
  } else {
    itemJSonStr = localStorage.getItem('itemsJson')
    console.log(itemJSonStr)
    list = JSON.parse(itemJSonStr)
  }

  console.log(list)
  let tableBody = document.getElementById('tableBody')
  let str = ''
  list.forEach((element, index) => {
    //console.log(element.tsk);
    str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element.tsk}</td>
                <td>${element.dt}</td>
                <td>${element.des}</td>
                <td><button class="btn btn-sm btn-warning" onclick="loadData(${index})">Edit</button>
                  <button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td>
                </tr>`
  })
  tableBody.innerHTML = str
}

function deleted (index) {
  list.splice(index, 1)
  localStorage.setItem('itemsJson', JSON.stringify(list))
  updateTable()
}

function loadData (index) {
  x = document.getElementById('actionBtn')
  x.style.display = 'none'
  // x.innerHTML =
  //   "<button id='updateBtn' class='btn btn-primary' onclick='edited()'>Update</button>"
    y = document.getElementById('updateBtn')
    y.style.display = ''
  document.getElementById('task').value = list[index].tsk
  document.getElementById('date').value = list[index].dt
  document.getElementById('Description').value = list[index].des
  document.getElementById('confirm').checked = true
  //   console.log(index)
  Uindex = index
  //   console.log(Uindex)
}

function edited () {
  //   console.log(Uindex)
  let task = document.getElementById('task').value
  let date = document.getElementById('date').value
  let desc = document.getElementById('Description').value
  const vfy = document.getElementById('confirm')
  if (task != '' && desc != '' && date != '') {
    if (vfy.checked == true) {
      var obj = {
        tsk: task,
        dt: date,
        des: desc
      }
      list[Uindex] = obj
      document.getElementById('task').value = ''
      document.getElementById('date').value = ''
      document.getElementById('Description').value = ''
      document.getElementById('confirm').checked = false
      x = document.getElementById('actionBtn')
      // x.innerHTML =
      //   "<button id='actionBtn' class='btn btn-primary'>Add to List</button>"
        x.style.display = ''
        y = document.getElementById('updateBtn')
        y.style.display = 'none'
      console.log(list)
      localStorage.setItem('itemsJson', JSON.stringify(list))
      updateTable()
    } else {
      alert('Please check the confirmation box..!')
    }
  } else {
    alert('Task or Description or Date field is empty..!')
  }
}


function searchByName() {
  let srch = document.getElementById('searchItem').value
  if (srch != '') {
    //console.log(srch.toLowerCase())
    let searchArr = []
    list.forEach((element, index) => {
      console.log(element.tsk.toLowerCase().search(srch))
      if (element.tsk.toLowerCase().search(srch.toLowerCase()) != -1 || element.tsk.toLowerCase() == srch.toLowerCase()) {
        searchArr.push(element)
      }
    })
    updateTableBySearch(searchArr)
    console.log(searchArr)
  } else {
    alert("Search Field is Empty!")
  }

}



function searchByDate() {
  let srch = document.getElementById('searchItemByDate').value
  if (srch != '') {
    //console.log(srch)
    let searchArr = []
    list.forEach((element, index) => {
      //console.log(element.dt)
      if (element.dt == srch) {
        searchArr.push(element)
      }
    })
    updateTableBySearch(searchArr)
    console.log(searchArr)
  } else {
    alert("Search Field is Empty!")
  }

}



function updateTableBySearch(searchArr) {
  let tableBody = document.getElementById('tableBody')
  let str = ''
  searchArr.forEach((element, index) => {
    str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element.tsk}</td>
                <td>${element.dt}</td>
                <td>${element.des}</td>
                <td><button class="btn btn-sm btn-warning" onclick="loadData(${index})">Edit</button>
                  <button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td>
                </tr>`
  })
  tableBody.innerHTML = str
}


add = document.getElementById('actionBtn')
add.addEventListener('click', AddData)

updateTable()
