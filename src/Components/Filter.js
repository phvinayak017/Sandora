import React, { Component } from 'react'

export default class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bedSelectedOption: 'isAllBeds'
        }
    }

    handleChange = (e) => {
        const { value, name:key } = e.target
        console.log(key, value)
        this.setState({
            bedSelectedOption: value
        })
<<<<<<< HEAD
        this.props.setFilter({key, value})
=======
        this.props.setFilter({ key, value })
>>>>>>> 60fc107758eaf3bad9c5f29008ac6bc1bb510b73
    }

    render() {
        console.log(this.props.filters)
        return (
            <div>
                <div>
                    <h2>Beds</h2>
                    <label>
                        <input
                            type="radio"
                            name='bedfilter'
                            value="isAllBeds"
                            checked={this.state.bedSelectedOption === 'isAllBeds'}
                            onChange={this.handleChange}
                        /> All Beds ( )
                    </label>
                    <label>
                        <input
                            type="radio"
                            name='bedfilter'
                            value="isOneBed"
                            checked={this.state.bedSelectedOption === 'isOneBed'}
                            onChange={this.handleChange}
                        /> 1 Bed ( )
                    </label>
                    <label>
                        <input
                            type="radio"
                            name='bedfilter'
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
                            name='bedfilter'
                            value="isStudio"
                            checked={this.state.bedSelectedOption === 'isStudio'}
                            onChange={this.handleChange}
                        />Studio ( )
                    </label>
                    <label>
                        <input
                            type="radio"
                            name='bedfilter'
                            value="isThreeBed"
                            checked={this.state.bedSelectedOption === 'isThreeBed'}
                            onChange={this.handleChange}
                        /> 3 Beds ( )
                    </label>
                    <label>
                        <input
                            type="radio"
                            name='bedfilter'
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