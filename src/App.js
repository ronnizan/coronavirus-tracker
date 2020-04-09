import React, { Component } from "react";
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker'
import styles from './App.module.css';
import { fetchData } from './api';
import logo from './images/corona2.jfif'; // with import


class App extends Component {
    state = {
        data: {},
        country: ''
    }



    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country)
        this.setState({ data: fetchedData, country: country })



    }


    render() {
        const { data, country } = this.state
        return (
            <div className={styles.container}>
                <img className={styles.image} alt="corona" src={logo} />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}
// "https://i.ibb.co/7QpKsCX/image.png"}
export default App;

