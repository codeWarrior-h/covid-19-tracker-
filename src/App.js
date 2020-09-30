import React , {useState , useEffect} from 'react';
import './App.css';
import { FormControl , Select , MenuItem } from '@material-ui/core';



function App() {

  const [countries , setCountries] =  useState([]);
  // STATE = how to write a variable in react
  //it temporarily stores the data

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

         setCountries(countries);
       })

     };

     getCountriesData();
  }, []);
  //the code inside here will run once when component loads and not again after
  // if [] is empty but if [] contains countries so it will run when countries change

  return (
    <div className="app">
     <div className = "app_header">

        {/* Header */}
        {/* Title + dropdown field */}
      <h1>COVID-19 TRACKER</h1>

      <FormControl className = "app_dropdown"> {/*to make the dropdown menu  */}

        <Select variant = "outlined" value = "" > {/* for selecting  */}

        {/*  <MenuItem value = "worldwide">Worldwide</MenuItem>  items available for selecting
          <MenuItem value = "worldwide">option 2</MenuItem>
          <MenuItem value = "worldwide">option 3</MenuItem>
          <MenuItem value = "worldwide">hey</MenuItem>*/}

         {/*Loop through all the countries and show dropdown menu list of options*/}
           {
             countries.map(country => (
               <MenuItem value = {country.value}>{country.name}</MenuItem>
             ))
           }

        </Select>

      </FormControl>


      {/* InfoBox */}
      {/* InfoBox */}
      {/* InfoBox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
      </div>
    </div>
  );
}

export default App;
