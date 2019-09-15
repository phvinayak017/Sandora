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
                bedFilter: '',
                bathFilter: '',
                petFilter: '',
                laundryFilter: '',
                styleFilter: ''
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
        const { bedFilter, bathFilter, petFilter, laundryFilter, styleFilter } = filterObject
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
                    // console.log(property.laundry)
                    console.log(property.property_type)

                    if (bedFilter === 'ALLBEDS' && parseInt(bathFilter) == property.bath
                        && (petFilter === property.pets_allowed || petFilter === null)
                        && laundryFilter === property.laundry && styleFilter === property.property_type) {
                        acc.push(property)
                    }
                    else if (bathFilter === 'ALLBATHS' && parseInt(bedFilter) === property.beds
                        && (petFilter === property.pets_allowed || petFilter === null)
                        && laundryFilter === property.laundry && styleFilter === property.property_type) {
                        acc.push(property)
                    }
                    else if (bathFilter === 'ALLBATHS' && bedFilter === 'ALLBEDS'
                        && (petFilter === property.pets_allowed || petFilter === null)
                        && laundryFilter === property.laundry && styleFilter === property.property_type) {
                        acc.push(property)
                    } else if (parseInt(bedFilter) === property.beds && parseFloat(bathFilter) == property.bath
                        && (petFilter === property.pets_allowed || petFilter === null)
                        && laundryFilter === property.laundry && styleFilter === property.property_type) {
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

    handleDone = () => {
        const { filters } = this.state
        this.getFilterData(filters);
        // console.log(filters)
    }

    handleClear = () => {
        console.log("setstate to Null")
        this.setState({
            filters: {
                bedFilter: '',
                bathFilter: '',
                petFilter: '',
                laundryFilter: '',
                styleFilter: ''
            }
        })
        this.getInitialData()
    }
    render() {
        const { propertyData } = this.state
        return (
            <div className='container'>
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
                                <button className="btn-clear" onClick={this.handleClear}>Clear</button>
                                <button className='btn-done' onClick={this.handleDone}>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='map'>
                    <h2> Google Map Api</h2>
                </div>
                <div className='property'>
                    <div className="cardContainer">
                        {
                            propertyData.map((property) => (
                                <PropertyCard
                                    Address={property.address}
                                    PropertyType={property.property_type}
                                    Laundry={property.laundry}
                                    Beds={property.beds}
                                    Baths={property.bath}
                                    Pets={property.pets_allowed}
                                    Price={property.price}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>


        )
    }
}