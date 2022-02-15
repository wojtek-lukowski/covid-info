const countriesApi = 'https://api.covid19api.com/countries';

const country = 'germany';
// const country = 'poland';

const api = `https://api.covid19api.com/total/country/${country}`;

//number of days will be lower by 1
const daysBack = 15;

(async function getSummary () {
  const data = await (await fetch(api)).json();
  const cummulatedPeriod = data.slice(-daysBack).map(({Confirmed}) => Confirmed);


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
    let object = {day, newCases}
    dailyCases.push(object);
  }

  document.querySelector('.country').innerHTML = country;
  document.querySelector('.countries').innerHTML = JSON.stringify(dailyCases);

  const casesArray = dailyCases.map(({newCases}) => newCases);
  document.querySelector('.today').innerHTML = JSON.stringify(casesArray[casesArray.length - 1]);
})();

getCountry = () => {
  let countryInput = document.getElementById('country').value;
  console.log('new country', countryInput);
  return countryInput;
}

//getting all the countries
// (async function getCountries () {
//   const data = await (await fetch(countriesApi)).json();
//   // console.log(data);
//   const countriesList = data.map(({Country}) => Country);
//   // console.log(countriesList);
// })();
