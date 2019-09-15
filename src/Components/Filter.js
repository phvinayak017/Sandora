import React, { Component } from 'react';
import { bedFilterObjects, bathFilterObjects, petFilterObjects, laundryFilterObjects, styleFilterObjects } from './filterObjects';


export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bedSelectionOption: this.props.filters.bedFilter,
            bathSelectionOption: this.props.filters.bathFilter,
            petSelectionOption: this.props.filters.petFilter,
            laundrySelectionOption: this.props.filters.laundryFilter,
            styleSelectionOption: this.props.filters.styleFilter,
        }
    }

    handleChange_Bed = (e) => {
        const { value, name: key } = e.target
        this.setState({
            bedSelectionOption: value,
        })
        this.props.setFilter({ key, value })
    }

    handleChange_Bath = (e) => {
        const { value, name: key } = e.target
        this.setState({
            bathSelectionOption: value,
        })
        this.props.setFilter({ key, value })
    }

    handleChange_Pet = (e) => {
        const { value, name: key } = e.target
        this.setState({
            petSelectionOption: value,
        })
        this.props.setFilter({ key, value })
    }

    handleChange_Style = (e) => {
        const { value, name: key } = e.target
        this.setState({
            styleSelectionOption: value,
        })
        this.props.setFilter({ key, value })
    }

    handleChange_Laundry = (e) => {
        const { value, name: key } = e.target
        this.setState({
            laundrySelectionOption: value,
        })
        this.props.setFilter({ key, value })
    }

    render() {
        return (
            <div>
                <div className='filterSelectionItems'>
                    <div>
                        <h2>Beds</h2>
                        {bedFilterObjects.map((obj) => (
                            <label>
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
                            <label>
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
                            <label>
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
                            <label>
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
                            <label>
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
            </div>

        )
    }
}