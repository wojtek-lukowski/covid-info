# Covid-info app

This is a client-side API app presenting the covid data: 
* daily cases for a selected coountr and number of days back;
* total cases for a selected country;
* total deaths for a selected country.

The app remembers your last setings (country and number of days) and will show them when reloaded (in the same browser).

it has been built with vanilla JavaScript, HTML and CSS. Data is visualised with Google Charts.

The data come from https://documenter.getpostman.com/view/10808728/SzS8rjbc . I am using a free version, so I had to implement soome re-calculations (e.g. daily cases are not available in free version, so i had to substract the totals of the consecutive days). Also, sometimes teh data is missing for some of the countrues from the list and sometimes the daily cases number value is questionalble (can be sometimes negative, probably due to the updates or recalculation of the totals).

The app is fully responsive, but if you play with the size of the browser wiindow - you need to reload after changing the size -  Google Charts need to be rerendered for the new size.