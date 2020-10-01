import React , {useState , useEffect} from 'react';
import './App.css';
import { FormControl , Select , MenuItem } from "@material-ui/core";
import Infobox from './Infobox';
import Map from './Map';
import {Card , CardContent } from "@material-ui/core";
import Table from './Table';
import {sortData} from './util';

function App() {

  const [countries , setCountries] =  useState([]);
  // STATE = how to write a variable in react
  //it temporarily stores the data

 const [country , setCountry] = useState('worldwide');

 const [countryInfo , setCountryInfo ] = useState({});

 const [tableData , setTableData] = useState([]);

 useEffect(() => {
   fetch('https://disease.sh/v3/covid-19/all')
   .then(response => response.json())
   .then((data) => {
     setCountryInfo(data);
   });
 } , []);
 //as when we reload the page we want the data of worldwide

//useEffect runs a piece of code for a given condition
//it fires when the app is load first
  useEffect(() => {

     const getCountriesData = async () => {
       await fetch ('https://disease.sh/v3/covid-19/countries')
       .then((response) => response.json())
       .then((data) => {
         const countries = data.map((country) => (
           {
             name: country.country, //INDIA , UNITED STATES , UNITED KINGDOM
             value: country.countryInfo.iso2 // IND , USA , UK
           }
         ));

         const sortedData = sortData(data); //calling the function we made in util.js to sort the data
         //by the no of cases in the country

         setTableData(sortedData); //to setup the table for all information
         setCountries(countries);
       })

     };

     getCountriesData();
  }, []);
  //the code inside here will run once when component loads and not again after
  // if [] is empty but if [] contains countries so it will run when countries change

  const onCountryChange = async (event) => {

    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      //storing all data of country given from the api
      setCountryInfo(data);
    })
  }

  return (
    <div className="app row">
     <div className = "app_left" >
      <div className = "app_header">

        {/* Header */}
        {/* Title + dropdown field */}
      <h1>COVID-19 TRACKER</h1>

      <FormControl className="app_dropdown">
           <Select
             variant="outlined"
             value={country}
             onChange={onCountryChange}
           >
             <MenuItem value="worldwide">Worldwide</MenuItem>
             {countries.map((country) => (
               <MenuItem value={country.value}>{country.name}</MenuItem>
             ))}
           </Select>
         </FormControl>
      </div>

         <div className = "app_stats">

            <Infobox title = "Coronavirus Cases" cases = {countryInfo.todayCases} total = {countryInfo.cases} />
             {/* InfoBox title="Coronavirus cases"*/}

            <Infobox title = "Recovered"  cases = {countryInfo.todayRecovered} total = {countryInfo.recovered}/>
             {/* InfoBox title = "recovries"*/}

            <Infobox title = "Deaths" cases = {countryInfo.todayDeaths} total = {countryInfo.deaths} />
             {/* InfoBox */}
        </div>

        <Map />
      {/* Map */}

      </div>

      <Card className = "app_right">
        <CardContent>
         <h3>Live Cases by Country</h3>
         {/* Table */}
         <Table countries = {tableData} />

         <h3>Worldwide new Cases</h3>
        {/* Graph */}
        </CardContent>
      </Card>
     </div>
  );
}

export default App;
