const countriesApi = 'https://api.covid19api.com/countries';

const country = 'germany';
const api = `https://api.covid19api.com/total/country/${country}`;


//getting all the countries
(async function getCountries () {
  const data = await (await fetch(countriesApi)).json();
  // console.log(data);
  const countriesList = data.map(({Country}) => Country);
  // console.log(countriesList);
})();

(async function getSummary () {
  const data = await (await fetch(api)).json();
  const last2WeeksCummulatives = data.slice(-15).map(({Confirmed}) => Confirmed);

  const dailyCases = [];
  for (let i = 0; i < last2WeeksCummulatives.length - 1; i++ ) {
    dailyCases.push(last2WeeksCummulatives[i+1] - last2WeeksCummulatives[i])
  }
  console.log(country, 'daily cases', dailyCases);

  // const last2WeeksDates= data.slice(-14).map(({Date}) => Date);
  // console.log(last2WeeksDates);

  // document.querySelector('.countries').innerHTML = JSON.stringify(data.slice(-14));
  document.querySelector('.countries').innerHTML = dailyCases;
})();

// "/dayone/country/:country/status/:status/live