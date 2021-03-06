import React, { Component } from 'react';
import { bedFilterObjects, bathFilterObjects, petFilterObjects, laundryFilterObjects, styleFilterObjects } from './filterObjects';
import uuid from 'uuid'

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bedSelectionOption: this.props.filters.bedFilter,
            bathSelectionOption: this.props.filters.bathFilter,
            petSelectionOption: this.props.filters.petFilter,
            laundrySelectionOption: this.props.filters.laundryFilter,
            styleSelectionOption: this.props.filters.styleFilter,
            minpriceRange: this.props.filters.minPrice,
            maxpriceRange: this.props.filters.maxPrice,

        }
    }

    handleMinPrice = (e) => {
        const { value, name: key } = e.target
        this.setState({
            minpriceRange: value,
        })
        this.props.setFilter({ key, value })
        this.props.filtersBoolean.isMinPriceSelected = true
    }

    handleMaxPrice = (e) => {
        const { value, name: key } = e.target
        this.setState({
            maxpriceRange: value,
        })
        this.props.setFilter({ key, value })
        this.props.filtersBoolean.isMaxPriceSelected = true
    }

    handleChange_Bed = (e) => {
        const { value, name: key } = e.target

        this.setState({
            bedSelectionOption: value,
        })
        this.props.setFilter({ key, value })
        this.props.filtersBoolean.isBedFilterSelected = true
    }

    handleChange_Bath = (e) => {
        const { value, name: key } = e.target
        this.setState({
            bathSelectionOption: value,
        })
        this.props.setFilter({ key, value })
        this.props.filtersBoolean.isBathFilterSelected = true
    }

    handleChange_Pet = (e) => {
        const { value, name: key } = e.target
        this.setState({
            petSelectionOption: value,
        })
        this.props.setFilter({ key, value })
        this.props.filtersBoolean.isPetFilterSelected = true
    }

    handleChange_Style = (e) => {
        const { value, name: key } = e.target
        this.setState({
            styleSelectionOption: value,
        })
        this.props.setFilter({ key, value })
        this.props.filtersBoolean.isStyleFilterSelected = true
    }

    handleChange_Laundry = (e) => {
        const { value, name: key } = e.target
        this.setState({
            laundrySelectionOption: value,
        })
        this.props.setFilter({ key, value })
        this.props.filtersBoolean.isLaundryFilterSelected = true
    }

    handleState() {
        this.setState({
            bedSelectionOption: this.props.filters.bedFilter,
            bathSelectionOption: this.props.filters.bathFilter,
            petSelectionOption: this.props.filters.petFilter,
            laundrySelectionOption: this.props.filters.laundryFilter,
            styleSelectionOption: this.props.filters.styleFilter,
            minpriceRange: this.props.filters.minPrice,
            maxpriceRange: this.props.filters.maxPrice,
        })
    }

    handleClick_Clear = () => {
        this.props.handleClear()
        this.props.filters.bedFilter = ""
        this.props.filters.bathFilter = ""
        this.props.filters.petFilter = ""
        this.props.filters.laundryFilter = ""
        this.props.filters.styleFilter = ""
        this.props.filters.minPrice = ""
        this.props.filters.maxPrice = ""
    }

    handleClick_Done = () => {
        this.props.handleDone()
        this.handleState()
    }

    render() {
        return (
            <div>
                <div className='priceFilter'>
                    <h2>Price</h2>
                    <input
                        type="number"
                        placeholder="Min Price"
                        name="minPrice"
                        value={this.state.minpriceRange}
                        min="0"
                        className="minPrice"
                        onChange={this.handleMinPrice} /> $ <span className="price">-</span>
                    <input
                        type="number"
                        placeholder="Max Price"
                        name="maxPrice"
                        value={this.state.maxpriceRange}
                        min="0"
                        className="maxPrice"
                        onChange={this.handleMaxPrice} /> $
                </div>
                <div className='filterSelectionItems'>
                    <div>
                        <h2>Beds</h2>
                        {bedFilterObjects.map((obj) => (
                            <label key={uuid.v4()}>
                                <input
                                    type="radio"
                                    name='bedFilter'
                                    value={obj.value}
                                    checked={this.state.bedSelectionOption === obj.value}
                                    onChange={this.handleChange_Bed}
                                /> {obj.name}
                            </label>
                        ))
                        }
                    </div>
                    <div>
                        <h2>Baths</h2>
                        {bathFilterObjects.map((obj) => (
                            <label key={uuid.v4()}>
                                <input
                                    type="radio"
                                    name='bathFilter'
                                    value={obj.value}
                                    checked={this.state.bathSelectionOption === obj.value}
                                    onChange={this.handleChange_Bath}
                                /> {obj.name}
                            </label>
                        ))
                        }
                    </div>
                    <div>
                        <h2>Pets</h2>
                        {petFilterObjects.map((obj) => (
                            <label key={uuid.v4()}>
                                <input
                                    type="radio"
                                    name='petFilter'
                                    value={obj.value}
                                    checked={this.state.petSelectionOption === obj.value}
                                    onChange={this.handleChange_Pet}
                                /> {obj.name}
                            </label>
                        ))
                        }
                    </div>
                    <div>
                        <h2>Style</h2>
                        {styleFilterObjects.map((obj) => (
                            <label key={uuid.v4()}>
                                <input
                                    type="radio"
                                    name='styleFilter'
                                    value={obj.value}
                                    checked={this.state.styleSelectionOption === obj.value}
                                    onChange={this.handleChange_Style}
                                /> {obj.name}
                            </label>
                        ))
                        }
                    </div>
                    <div>
                        <h2>Laundry</h2>
                        {laundryFilterObjects.map((obj) => (
                            <label key={uuid.v4()}>
                                <input
                                    type="radio"
                                    name='laundryFilter'
                                    value={obj.value}
                                    checked={this.state.laundrySelectionOption === obj.value}
                                    onChange={this.handleChange_Laundry}
                                /> {obj.name}
                            </label>
                        ))
                        }
                    </div>
                </div>
                <div className="filter-bottom ">
                    <button className="btn-clear" onClick={this.handleClick_Clear}>Clear</button>
                    <button className='btn-done' onClick={this.handleClick_Done}>Done</button>
                </div>
            </div>

        )
    }
}