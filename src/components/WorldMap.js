import React, { Component } from 'react';
import World from '@svg-maps/world';
import { CheckboxSVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { getLocationName } from './MapFunctions';
import 'react-svg-map/src/svg-map.scss'
import WorldInfo from '../MapUtilities/MapInfo.js'
import '../App.css'
import _ from 'underscore'



class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountries: WorldInfo.worldInfo.locations,
      country: '',
      selectedLocations: [],
      focusedLocation: '',
    }
    this._handleCountry = this._handleCountry.bind(this);
    // this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleLocationFocus = this._handleLocationFocus.bind(this);
    this._handleLocationBlur = this._handleLocationBlur.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleColorCountry = this._handleColorCountry.bind(this);
    this._mapTourCountry = this._mapTourCountry.bind(this);


  }


  _handleCountry(event) {
    this.setState({ country: event.target.value });
  }

  _handleLocationFocus(event) {
  const focusedLocation = getLocationName(event);
  this.setState({ focusedLocation: focusedLocation });
  }

  _handleLocationBlur() {
  this.setState({ focusedLocation: null });
  }

  // _handleMouseOver(event) {
  //   const focusedLocation = getLocationName(event);
  //   this.setState({ focusedLocation : focusedLocation});
  // }

  _handleOnChange(selectedNodes) {
    console.log(selectedNodes);
		this.setState(prevState => {
			return {
				...prevState,
				selectedLocations: selectedNodes.map(node => node.attributes.name.value)
			};
		});
	}

  _handleColorCountry(tourCountry) {
    const allCountries = this.state.allCountries.find(country => country.name === tourCountry)
    if (allCountries) {
      const country = document.getElementById(allCountries.id); //get the toured countries,
      country.style.fill = 'orange';
    }
  }
  formatYear(string) {
    var options = { year: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  _mapTourCountry() {
    const findYear = this.props.tourCountries.filter((tour) => this.formatYear(tour.datetime) === this.props.year)
    const countryArray = findYear.map((tour) => tour.venue.country)
    const filterCountryArray = _.uniq(countryArray)

    const colourCountries = (index = 0) => {
      if (index !== filterCountryArray.length) {
        this._handleColorCountry(filterCountryArray[index])
        setTimeout(() => colourCountries(index + 1), 3000)
      }
    }
    colourCountries();
  }




  render() {
    return (
      <div>
        <button onClick={this._mapTourCountry}>Color Map</button>
        <CheckboxSVGMap map={World}
            onLocationFocus={this._handleLocationFocus}
						onLocationBlur={this._handleLocationBlur}
						onChange={this._handleOnChange} />
      </div>
    );
  }
}
export default WorldMap;
