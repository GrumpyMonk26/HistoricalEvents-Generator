const textList = [
  'saxon',
  'roman empire',
  'American Revolution',
  'French Revolution',
  'American Civil War',
  'World War I',
  'World War II',
  'Cold War',
  'greek',
  'Aztec',
  'The Napoleonic Wars',
  'african',
  'british',
  'polish',
  'indian',
  'asian',
  'south american',
  'mexican',
  'german',
  'russia',
  'ussr',
  'iran',
];

let randItem = Math.floor(Math.random() * textList.length);
console.log(randItem);

// Select the text using the random index
const text = textList[randItem];

const apiKey = 'mL25MGOW/xtCwpgr8GPLMA==7KNriaOkYcucfFuP';

const eventEl = document.getElementById('event');
const yearEl = document.getElementById('year');
const btnEl = document.getElementById('events-btn');
const searchEl = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
  console.log('clicked search btn');
});

async function getEvent() {
  // Generate a random index to select a random text from the list
  let randItem = Math.floor(Math.random() * textList.length);
  console.log(randItem);

  // Select the text using the random index
  const text = textList[randItem];
  console.log(text);

  try {
    eventEl.textContent = 'Loading...';

    // Make a request to the API with the selected text
    const response = await fetch(
      'https://api.api-ninjas.com/v1/historicalevents?text=' + text,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response as JSON
    const result = await response.json();

    // Select a random event from the result object
    const keys = Object.keys(result);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randItem = keys[randIndex];

    // Display the event and year in the UI
    searchEl.textContent = `- ${text}`;
    eventEl.textContent = result[randItem].event;
    yearEl.textContent = result[randItem].year;

    console.log(result[randItem].event);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

btnEl.addEventListener('click', getEvent);
