// navigator.geolocation.getCurrentPosition(success);

// function success (pos) {
//   const crd = pos.coords;
//   console.log('current position: ', crd.latitude, crd.longitude);
// }

const country = 'germany';
const daysBack = 100;
// document.querySelector('.loading').style.display = "none";

//number of days shown will be lower by 1
document.querySelector('#number-of-days').value = daysBack;

async function getCountry(country, daysBack) {
  document.querySelector('.loading').style.display = "block";
  const api = `https://api.covid19api.com/total/country/${country}`;
  const data = await (await fetch(api)).json();
  console.groupCollapsed('data');
  console.log('data', data);
  console.groupEnd('data');
  const cummulatedPeriod = data.slice(-daysBack).map(({Confirmed}) => Confirmed);
  // document.querySelector('.loading').style.display = "none";

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

  const lastEntry = dailyCases[dailyCases.length-1];
  const lastNumber = lastEntry[1];
  const lastDate = lastEntry[0];
  
  document.querySelector('.last-date').innerHTML = lastDate;
  document.querySelector('.last-number').innerHTML = lastNumber;

//creating totals data for charts

//total cases
  const totals = data.map(({Date, Confirmed}) => ({Date, Confirmed}));
  const totalsHeader = ['Date', 'Total cases'];
  const totalsArray = totals.map((object) => Object.values(object));
  totalsArray.unshift(totalsHeader);

//total deaths
  const totalDeaths = data.map(({Date, Deaths}) => ({Date, Deaths}));
  const totalDeathsHeader = ['Date', 'Total deaths'];
  const totalDeathsArray = totalDeaths.map((object) => Object.values(object));
  totalDeathsArray.unshift(totalDeathsHeader);

//goggle charts -  total cases
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

 //goggle charts -  total deaths
 google.charts.load('current', {'packages':['corechart']});
 google.charts.setOnLoadCallback(drawTotalDeathsChart);
 
 function drawTotalDeathsChart() {
   var data = google.visualization.arrayToDataTable(
     totalDeathsArray
   );
 
   var options = {
     title: `${country} - total deaths`,
     curveType: 'function',
     legend: { position: 'bottom' }
   };
 
   var chart = new google.visualization.LineChart(document.getElementById('country-total-deaths'));
 
   chart.draw(data, options);
 }

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

document.querySelector('.loading').style.display = "none";
};

getCountry(country, daysBack);

// setCountry = () => {
//   let countryInput = document.getElementById('country').value;
//   console.log('new country', countryInput);
//   getCountry(countryInput, daysBack);
// }

setState = () => {
  let countryInput = document.getElementById('country').value;
  if (!countryInput) {
    countryInput = country
  };
  let numberInput = document.getElementById('number-of-days').value;
  if (!numberInput) {
    numberInput = daysBack
  };
  console.log(countryInput, numberInput);
  getCountry(countryInput, numberInput);
}

// getting all the countries
(async function getCountries () {
  // const summaryApi = 'https://api.covid19api.com/summary';
  // const data = await (await fetch(summaryApi)).json();
  // console.log(data);
  // document.querySelector('.summary').innerHTML = JSON.stringify(data);



  // const countriesList = data.map(({Country}) => Country);
  // const countriesSlugs = data.map(({Slug}) => Slug);
  // const countriesAndSlugs = data.map(({Country, Slug }) => ({Country, Slug}));
  // document.querySelector('.countries-list').innerHTML = JSON.stringify(countriesList);
  // console.log(countriesAndSlugs);
  // console.log(countriesList);
  // console.log(countriesSlugs);

  // const countriesToGet = countriesSlugs.splice(-5);
  // const countriesToGet = ['germany', 'poland', 'united-kingdom', 'italy', 'spain', 'france', 'sweden'];
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

//current year in the footer
const date = new Date();
const currentYear = date.getFullYear(); 
document.getElementById("year").innerHTML = currentYear;

