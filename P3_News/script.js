console.log('Welcome to Duko News')

// 73a660b479f842b7a2536e707caba616

var myObj

let xhr = new XMLHttpRequest()
xhr.open(
  'GET',
  'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=73a660b479f842b7a2536e707caba616',
  true
)
xhr.onload = function () {
  if (this.status === 200) {
    myObj = JSON.parse(this.responseText)
    populate()
  } else {
    console.log(`Some error occured`)
  }
}
xhr.send()

function populate () {
  let results = myObj.articles
  let html = ''
    results.forEach(element => {
        let dateTime = new Date(element.publishedAt)
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
    html += `                <div class="p-4 md:w-1/3">
    <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="${element.urlToImage}" alt="blog">
        <div class="p-6">
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">${element.source['name']}</h2>
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${element.title}</h1>
            <p class="leading-relaxed mb-3">${element.description}</p>
            <div class="flex items-center flex-wrap ">
                <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" target='_blank' href="${element.url}">
                    Learn More
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </a>
                <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>${time +' ' +date}
                    </span>
            </div>
        </div>
    </div>
</div>`
  })
  let newsDiv = document.getElementById('newsDiv')
  newsDiv.innerHTML = html
}
