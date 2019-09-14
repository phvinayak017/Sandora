import React, { Component } from 'react'
import Axios from 'axios'
import Filter from './Filter'
import PropertyCard from './PropertyCard'


export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyData: [],
            filters: {
                bedFilter: 'ALLBEDS',
                bathFilter: 'ALLBATHS',
                petFilter: 'NONE',
                laundryFilter: 'APT'
            }
        }
    }

    componentWillMount() {
        this.getInitialData()
    }

    getInitialData() {
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
                console.log(data)
                this.setState({
                    propertyData: data
                })
            })
    }

    setFilter = ({ key, value }) => (
        this.setState((state) => ({ filters: { ...state.filters, [key]: value } }))
    )

    getFilterData(filterObject) {
        const { bedFilter, bathFilter, petFilter } = filterObject
        console.log(bedFilter, bathFilter, petFilter)
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
                var filteredProperty = data.reduce((acc, property) => {
                    // console.log(property.pets_allowed)
                    if (bedFilter === 'allbeds' && parseInt(bathFilter) == property.bath
                        && (petFilter === property.pets_allowed || petFilter === null)) {
                        acc.push(property)
                    }
                    else if (bathFilter === 'allbaths' && parseInt(bedFilter) === property.beds
                        && (petFilter === property.pets_allowed || petFilter === null)) {
                        acc.push(property)
                    }
                    else if (bathFilter === 'allbaths' && bedFilter === 'allbeds'
                        && (petFilter === property.pets_allowed || petFilter === null)) {
                        acc.push(property)
                    } else if (parseInt(bedFilter) === property.beds && parseFloat(bathFilter) == property.bath
                        && (petFilter === property.pets_allowed || petFilter === null)) {
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
        this.getFilterData(filters);
        // console.log(filters)
    }

    render() {
        const { propertyData } = this.state
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
                    {
                        propertyData.map((property) => (
                            <PropertyCard
                                address={property.address}
                                propertyType={property.property_type}
                                Beds={property.beds}
                                Price={property.price}
                            />
                        ))
                    }

                </div>

            </div>
        )
    }
}