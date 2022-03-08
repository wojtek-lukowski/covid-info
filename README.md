# Covid-info app

Client-side API app presenting the covid data: 
* daily cases for a selected country and number of days back;
* total cases for a selected country;
* total deaths for a selected country.

The app remembers your last settings (country and number of days) and will show them when reloaded (in the same browser).

Tech-stack: vanilla JavaScript, HTML, CSS, Google Charts (for data visualisation).

The app is fully responsive, but if you play with the size of the browser window - you need to reload after changing the size -  Google Charts need to be re-rendered to adjust.

The data come from https://documenter.getpostman.com/view/10808728/SzS8rjbc . I am using a free version, so I had to implement soome re-calculations (e.g. daily cases are not available in free version, so I had to substract the totals of the consecutive days). Also, sometimes the data is missing for some of the countrues from the list and sometimes the daily cases number value is questionable (can be sometimes negative, probably due to the updates or recalculation of the totals).

[Open app](https://wojtek-lukowski.github.io/covid-info/)