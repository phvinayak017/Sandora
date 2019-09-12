import React, { Component } from 'react'

export default class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bedSelectedOption: 'isAllBeds'
        }
    }

    handleChange = (e) => {
        const { value: key, checked: value } = e.target
        console.log(key, value)
        this.setState({
            bedSelectedOption: key
        })
        this.props.setFilter(key, value)
    }

    render() {
        const { filters } = this.props
        console.log(filters)
        return (
            <div>
                <div>
                    <h2>Beds</h2>
                    <label>
                        <input
                            type="radio"
                            value="isAllBeds"
                            checked={this.state.bedSelectedOption === 'isAllBeds'}
                            onChange={this.handleChange}
                        /> All Beds ( )
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="isOneBed"
                            checked={this.state.bedSelectedOption === 'isOneBed'}
                            onChange={this.handleChange}
                        /> 1 Bed ( )
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="isTwoBed"
                            checked={this.state.bedSelectedOption === 'isTwoBed'}
                            onChange={this.handleChange}
                        /> 2 Beds ( )
                    </label>
                </div><br />
                <div>
                    <label>
                        <input
                            type="radio"
                            value="isStudio"
                            checked={this.state.bedSelectedOption === 'isStudio'}
                            onChange={this.handleChange}
                        />Studio ( )
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="isThreeBed"
                            checked={this.state.bedSelectedOption === 'isThreeBed'}
                            onChange={this.handleChange}
                        /> 3 Beds ( )
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="isFourPlusBed"
                            checked={this.state.bedSelectedOption === 'isFourPlusBed'}
                            onChange={this.handleChange}
                        /> 4+ Beds ( )
                    </label>
                </div>
            </div>
        )
    }
}