import './style.css'
//https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=Cancer&day=today
//   setTimeout(async () => addHoroscopeToContainer({
//     "date_range": "Jun 22 - Jul 22",
//     "current_date": "August 31, 2021",
//     "description": "You're tempted to display the full range of your knowledge. This kind of showing off will impress some people and leave others scratching their heads. Today's reaction gives you ideas about tomorrow's joke.",
//     "compatibility": "Taurus",
//     "mood": "Talkative",
//     "color": "Orchid",
//     "lucky_number": "80",
//     "lucky_time": "5am"
// }), 3000)
  // TODO: pass value to getHoroscope function
const horoscopeContainer = document.getElementById("horoscope");
const horoscopeButtons = document.querySelectorAll('.astro-btn');

[...horoscopeButtons].map(btn => {
  btn.addEventListener('click', (event) => {
    // console.log(event)
    //console.log(event.target.dataset.astroSign)
    const selectedSign = event.target.dataset.astroSign

      getHoroscope(selectedSign) // STATION 1
      //.then(addHoroscopeToContainer) // STATION 2
      //.then(horoscopeJSON => addHoroscopeToContainer(horoscopeJSON)) // STATION 2
      .then(function (horoscopeJSON) { 
        addHoroscopeToContainer(horoscopeJSON)
      }) // STATION 2
      .catch(console.error)
    
  })
})

async function getHoroscope(selectedSign){
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-host", "sameer-kumar-aztro-v1.p.rapidapi.com");
  myHeaders.append("x-rapidapi-key", "1b5d033579mshfe3de63194fe8c8p111708jsn1bd32ea789d5");
  const requestOptions = {
    method: 'POST',
    headers: myHeaders
  }

  const aztroResponse = await fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${selectedSign}&day=today`,requestOptions )
  
  //console.log(aztroResponse)
  if(aztroResponse.ok){
    let json = await aztroResponse.json()
    json.signName = selectedSign;
    return json
  }

}


function addHoroscopeToContainer(horoscopeData){
  console.log(horoscopeData)
  // TODO: fetch data from API and
  const horoscopeHtml = renderHoroscope(horoscopeData);
  horoscopeContainer.innerHTML = "";
  horoscopeContainer.insertAdjacentHTML('beforeend', horoscopeHtml);
}

function renderHoroscope(details){
  return `
  <h1 class="text-4xl font-bold uppercase text-indigo-600 transition duration-500">Horoscope for ${details.signName}</h1>
  <h2 class="text-xl text-gray-700 transition duration-500">Week of: ${details.date_range}</h2>
  <h2 class="text-xl text-gray-700 transition duration-500">Description: ${details.description}</h2>
  <h2 class="text-xl text-gray-700 transition duration-500">Compatibility: ${details.compatibility}</h2>
  <h2 class="text-xl text-gray-700 transition duration-500">Mood: ${details.mood}</h2>
  <h2 class="text-xl text-gray-700 transition duration-500">Color: ${details.color}</h2>
  <h2 class="text-xl text-gray-700 transition duration-500">Lucky Number: ${details.lucky_number}</h2>
  <h2 class="text-xl text-gray-700 transition duration-500">Lucky Time: ${details.lucky_time}</h2>
  `
}