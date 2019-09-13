import React, { Component } from 'react';
import { bedFilterObjects } from './filterObjects';


export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bedSelectedOption: 'allbeds'
        }
    }

    handleChange = (e) => {
        const { value, name: key } = e.target
        console.log(key, value)
        this.setState({
            bedSelectedOption: value
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
                                name='bedfilter'
                                value={obj.value}
                                checked={this.state.bedSelectedOption === obj.value}
                                onChange={this.handleChange}
                            /> {obj.name}( )
                    </label>
                    ))
                    }
                </div>
            </div>
        )
    }
}