import React, { Component } from 'react';
import { bedFilterObjects, bathFilterObjects, petFilterObjects } from './filterObjects';


export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bedSelectionOption: 'ALLBEDS',
            bathSelectionOption: 'ALLBATHS',
            petSelectionOption: "NONE"
        }
    }

    handleChange_Bed = (e) => {
        const { value, name: key } = e.target
        // console.log(key, value)
        this.setState({
            bedSelectionOption: value,
        })
        this.props.setFilter({ key, value })
    }

    handleChange_Bath = (e) => {
        const { value, name: key } = e.target
        // console.log(key, value)
        this.setState({
            bathSelectionOption: value,
        })
        this.props.setFilter({ key, value })
    }

    handleChange_Pet = (e) => {
        const { value, name: key } = e.target
        // console.log(key, value)
        this.setState({
            petSelectionOption: value,
        })
        this.props.setFilter({ key, value })
    }

    render() {
        return (
            <div>
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
                            /> {obj.name}( )
                    </label>
                    ))
                    }
                    <h2>Baths</h2>
                    {bathFilterObjects.map((obj) => (
                        <label>
                            <input
                                type="radio"
                                name='bathFilter'
                                value={obj.value}
                                checked={this.state.bathSelectionOption === obj.value}
                                onChange={this.handleChange_Bath}
                            /> {obj.name}( )
                    </label>
                    ))
                    }

                    <h2>Pets</h2>
                    {petFilterObjects.map((obj) => (
                        <label>
                            <input
                                type="radio"
                                name='petFilter'
                                value={obj.value}
                                checked={this.state.petSelectionOption === obj.value}
                                onChange={this.handleChange_Pet}
                            /> {obj.name}( )
                    </label>
                    ))
                    }
                </div>
            </div>
        )
    }
}