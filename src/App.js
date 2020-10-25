import React from 'react'
import './App.css';
import CountryList from './component/CountryList';
import Search from './component/Search'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      countries : [],
      stats : [],
      search : ""
    }
  }
  
  async componentDidMount(){
    const res = await fetch('https://api.covid19api.com/countries')
    const countries = await res.json();
    this.setState({countries: countries})
    /** loop start **/
    if(countries.length)
      this.state.countries.forEach(async country => {
        const resp = await fetch('https://api.covid19api.com/total/country/'+country.Slug)
        const data = await resp.json();
        /** loop start **/
        if(data.length)
          this.setState(prevStats => (
            {stats: prevStats.stats.concat( {...data[data.length -1], CountryCode: country.ISO2} )}
          ))
        /** loop end **/
      })
    /** loop end **/
  }

  handleChange = (e) => {
    this.setState({search : e.target.value})
  }

  render(){

    const {stats, search} = this.state
    const filteredCountries = stats.filter(country => (
      country.Country.toLowerCase().includes(search.toLowerCase())
    ))

    return(
      <div className='App'>
        <h1>Covid-19 Stats</h1>
        <Search 
          placeHolder=''
          onChangeHandler={this.handleChange}
        />
        <CountryList stats={filteredCountries}/>
      </div>
    );
  }
}

export default App;
