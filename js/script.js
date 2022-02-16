const countriesApi = 'https://api.covid19api.com/countries';

// const country = 'germany';
const country = 'germany';

const api = `https://api.covid19api.com/total/country/${country}`;
// const api = `https://api.covid19api.com/premium/country/south-africa`;

//number of days will be lower by 1
const daysBack = 30;
document.querySelector('#number-of-days').value = daysBack;

const countryModule = (async function getCountry () {
  document.querySelector('.loading').style.display = "block";
  const data = await (await fetch(api)).json();
  // console.log('data', data);
  // console.log('premium', data);
  const cummulatedPeriod = data.slice(-daysBack).map(({Confirmed}) => Confirmed);
  document.querySelector('.loading').style.display = "none";

//creating totals data for charts
  const totals = data.map(({Date, Confirmed}) => ({Date, Confirmed}));
  const totalsHeader = ['Date', 'Total cases'];
  const totalsArray = totals.map((object) => Object.values(object));
  totalsArray.unshift(totalsHeader);

   //goggle charts -  totals
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawTotalsChart);

function drawTotalsChart() {
  var data = google.visualization.arrayToDataTable(
    totalsArray
  );

  var options = {
    title: `${country} - total cases`,
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('country-totals'));

  chart.draw(data, options);
}

  // creating an array with object where an object contain date and daily new cases. The daily new cases
  // are calculated by sustracting the day before from the total (cummulative from day 1) value of
  // the previous day.
  const dailyCases = [];
  const today = new Date()
  let startingDate = new Date(today);
  startingDate.setDate(startingDate.getDate() - daysBack + 1);

  for (let i = 0; i < cummulatedPeriod.length - 1; i++ ) {
    let newCases = cummulatedPeriod[i+1] - cummulatedPeriod[i];
    let dayBefore = new Date(startingDate);
    dayBefore.setDate(dayBefore.getDate() + i);
    let day = dayBefore.toLocaleString();
    // let day = dayBefore.getTime();
    let array = [day, newCases]
    dailyCases.push(array);
  }
  const header = ['Date', 'Daily Cases'];
  dailyCases.unshift(header);
  document.querySelector('.country').innerHTML = country;
  // document.querySelector('.country-data').innerHTML = JSON.stringify(dailyCases);

  const lastEntry = dailyCases[dailyCases.length-1];
  const lastNumber = lastEntry[1];
  const lastDate = lastEntry[0];
  
  document.querySelector('.last-date').innerHTML = lastDate;
  document.querySelector('.last-number').innerHTML = lastNumber;

  //goggle charts - daily cases
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawDailyChart);

function drawDailyChart() {
  var data = google.visualization.arrayToDataTable(
    dailyCases
  );

  var options = {
    title: `${country} - daily cases`,
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('country-chart'));

  chart.draw(data, options);
}

})();

getCountry = () => {
  let countryInput = document.getElementById('country').value;
  console.log('new country', countryInput);
  return countryInput;
}

// getting all the countries
(async function getCountries () {
  const data = await (await fetch(countriesApi)).json();
  const countriesList = data.map(({Country}) => Country);
  const countriesSlugs = data.map(({Slug}) => Slug);
  const countriesAndSlugs = data.map(({Country, Slug }) => ({Country, Slug}));
  // document.querySelector('.countries-list').innerHTML = JSON.stringify(countriesList);
  // console.log(countriesAndSlugs);
  // console.log(countriesList);
  // console.log(countriesSlugs);

  // const countriesToGet = countriesSlugs.splice(-5);
  const countriesToGet = ['germany', 'poland', 'united-kingdom', 'italy', 'spain', 'france', 'sweden'];
  // console.log('shortened list', countriesToGet);

  // const countriesData = countriesList.map((country => await fetch(`https://api.covid19api.com/total/country/${country}`).json()));
  // const countriesData = countriesToGet.map((country => getCountryData(country)));

  // async function getCountryData (country) {
  //  const countryLast = await (await fetch('https://api.covid19api.com/total/country/' + country)).json();
  //   console.log(countryLast);
  // }
    
  // const countriesData = countriesList.map((country => console.log(country)));
  // console.log(countriesData);
})();

