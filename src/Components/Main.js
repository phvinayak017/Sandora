import React, { Component } from 'react'
import Axios from 'axios'
import Filter from './Filter'


export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyData: [],
            filters: {
                bedfilter: 'allbeds',
                bathFilter: 'allbaths',
                petFilter: 'cat',
                laundryFilter: 'Apartment'

            }
        }
    }

    setFilter = ({ key, value }) => (
        this.setState((state) => ({ filters: { ...state.filters, [key]: value } }))
    )

    getData(filterObject) {
        const { bedfilter, bathFilter, petFilter } = filterObject
        // console.log(typeof (bedfilter), bathFilter, petFilter)
        const url = `https://sandoratest-service.herokuapp.com/api/property/quickView?long=
        -121.88632860000001&lat=37.3382082&distance=100&userId=null`
        Axios({
            url,
            method: "get",
            auth: {
                username: 'testuser',
                password: 'testpassword'
            },
        })
            .then(({ data: { data } }) => {
                // console.log(data)
                var filteredProperty = data.reduce((acc, property) => {
                    if (bedfilter === 'allbeds') {
                        acc.push(property)
                    } else if (parseInt(bedfilter) === property.beds) {
                        acc.push(property)
                    }
                    return acc
                }, [])
                console.log(filteredProperty)
                this.setState({
                    propertyData: filteredProperty
                })

            })
    }

    handleClick = () => {
        const { filters } = this.state
        this.getData(filters);
        // console.log(this.state.filters)
    }

    render() {
        return (
            <div>
                <div className='navbar'>
                    <div className="dropdown">
                        <button className='btnfilter'>Filter</button>
                        <div className="dropdown-content">
                            <div>
                                <Filter
                                    filters={this.state.filters}
                                    setFilter={this.setFilter}
                                />
                            </div>
                            <div className="filter-bottom ">
                                <button className="btn-clear">Clear</button>
                                <button className='btn-done'>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mainarea'>
                    <button
                        onClick={this.handleClick}
                    >Get Data</button>
                </div>

            </div>
        )
    }
}