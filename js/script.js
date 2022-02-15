const countriesApi = 'https://api.covid19api.com/countries';

const country = 'germany';
// const country = 'poland';

const api = `https://api.covid19api.com/total/country/${country}`;

const daysBack = 15;

(async function getSummary () {
  const data = await (await fetch(api)).json();
  const last2WeeksCummulatives = data.slice(-daysBack).map(({Confirmed}) => Confirmed);

  const dailyCases = [];
  const today = new Date()
  let startingDate = new Date(today);
  startingDate.setDate(startingDate.getDate() - daysBack + 1);

  for (let i = 0; i < last2WeeksCummulatives.length - 1; i++ ) {
  let newCases = last2WeeksCummulatives[i+1] - last2WeeksCummulatives[i];

    let dayBefore = new Date(startingDate);
    dayBefore.setDate(dayBefore.getDate() + i);
   let day = dayBefore.toLocaleString();

   let object = {day, newCases}

  dailyCases.push(object);

  }
  console.log(country, 'daily cases', dailyCases);

  document.querySelector('.country').innerHTML = country;
  document.querySelector('.countries').innerHTML = JSON.stringify(dailyCases);
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
