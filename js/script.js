const apiCovid = 'https://opendata.ecdc.europa.eu/covid19/nationalcasedeath_eueea_daily_ei/json/';
// const api = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
const countriesApi = 'https://api.covid19api.com/countries';
const api = 'https://api.covid19api.com/dayone/country/';

// (function getCountries() {
//   return fetch(apiCovid).then(function(response) {
//     return response.json();
//   }).then(function(json) {
//     json.results.forEach(function(item) {
//       let data = {
//         name: item.name,
//         detailsUrl: item.url
//       };
//       console.log(response);
//     });
//   });
// })();

// (function getCountries() {
//   return fetch(countriesApi).then(function(response) {
//     return response.json();
//   }).then(function(json) {
//     console.log(json);
//   });
// })();


//getting all the countries
(async function getCountries () {
  const data = await (await fetch(countriesApi)).json();
  // console.log(data);
  const countriesList = data.map(({Country}) => Country);
  // console.log(countriesList);
})();

(async function getSummary () {
  const api = 'https://api.covid19api.com/total/country/germany'
  const data = await (await fetch(api)).json();
  // console.log('summary: ', data);
  const last2Weeks = data.slice(-14);
  console.log(last2Weeks);
  const last2WeeksCummulatives = data.slice(-15).map(({Confirmed}) => Confirmed);
  console.log(last2WeeksCummulatives);
  console.log(last2WeeksCummulatives.length);

  const dailyCases = [];
  for (let i = last2WeeksCummulatives.length; i = 0; i-1 ) {
    // dailyCases.push(last2WeeksCummulatives[i] - last2WeeksCummulatives[i - 1]);
    console.log('looping...');
  }
  console.log('daily cases', dailyCases);



    //   const dailyCases = [];

    //   let cases = last2WeeksCummulatives[14] - last2WeeksCummulatives[13];
    //   let today = new Date();
    //   today = today.toLocaleString();
    //   let object = {today, cases}
    //   dailyCases.push(object);
      
    //   cases = last2WeeksCummulatives[13] - last2WeeksCummulatives[12];
    //   let date = new Date();
    //   // date = date.getDate() - 1;
    //   date = today.toLocaleString() - 1;
    //   object = {date, cases}
    //   dailyCases.push(object);


    //   cases = last2WeeksCummulatives[12] - last2WeeksCummulatives[11];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[11] - last2WeeksCummulatives[10];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[10] - last2WeeksCummulatives[9];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[9] - last2WeeksCummulatives[8];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[8] - last2WeeksCummulatives[7];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[7] - last2WeeksCummulatives[6];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[6] - last2WeeksCummulatives[5];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[5] - last2WeeksCummulatives[4];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[4] - last2WeeksCummulatives[3];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[3] - last2WeeksCummulatives[2];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[2] - last2WeeksCummulatives[1];
    //   dailyCases.push(cases);
    //   cases = last2WeeksCummulatives[1] - last2WeeksCummulatives[0];
    //   dailyCases.push(cases);

    // console.log('daily cases', dailyCases);


  // const last2WeeksDates= data.slice(-14).map(({Date}) => Date);
  // console.log(last2WeeksDates);

  // document.querySelector('.countries').innerHTML = JSON.stringify(data.slice(-14));
  // document.querySelector('.countries').innerHTML = last2WeeksCases;
})();



//   calculateDailyCases = (cummulative) => {
//   const dailyCases = [];
//   for (let i = 13; i = 0; i-1 ) {
//     const daily = cummulative[i] - cummulative[i - 1]
//     dailyCases.add(daily);
//     console.log('daily cases', dailyCases);
//   } 
// }


// (async function getSummary () {
//   const api = 'https://api.covid19api.com/country/germany/status/confirmed/live?from=2022-02-13T00:00:00Z&to=2022-02-14T00:00:00Z'
//   const data = await (await fetch(api)).json();
//   console.log('summary2: ', data);
//   // const last2Weeks = data.slice(-14);
//   // console.log(last2Weeks);
//   const last2WeeksCases = data.slice(-14).map(({Cases}) => Cases);
//   // const last2WeeksDates= data.slice(-14).map(({Date}) => Date);
//   console.log(last2WeeksCases);
//   // console.log(last2WeeksDates);


//   // document.querySelector('.countries').innerHTML = JSON.stringify(data.slice(-14));
//   // document.querySelector('.countries').innerHTML = last2WeeksCases;
// })();



// (async function getdata () {
//   const currentApi = `${api}/'poland'/status/'confirmed'/live`;
//   const data = await (await fetch(currentApi)).json();
//   console.log(data);
//   // const countriesList = data.map(({Country}) => Country);
//   // console.log(countriesList);
// })();

// "/dayone/country/:country/status/:status/live