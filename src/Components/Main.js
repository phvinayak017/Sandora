import React, { Component } from 'react'
import Axios from 'axios'
import Filter from './Filter'
import PropertyCard from './PropertyCard'
import uuid from 'uuid'



export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyData: [],
            filters: {
                bedFilter: 'asdfdsf',
                bathFilter: '',
                petFilter: '',
                laundryFilter: '',
                styleFilter: '',

            },
            filtersBoolean: {
                isBedFilterSelected: false,
                isBathFilterSelected: false,
                isPetFilterSelected: false,
                isLaundryFilterSelected: false,
                isStyleFilterSelected: false,
            },
            open: false,
        }
    }
    container = React.createRef();

    setFilter = ({ key, value }, bool) => (
        this.setState((state) => ({ filters: { ...state.filters, [key]: value } }))
    )

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillMount() {
        this.getInitialData()
        document.removeEventListener("mousedown", this.handleClickOutside);
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
                // console.log(data)
                this.setState({
                    propertyData: data
                })
            })
    }

    getFilterData(filterObject) {
        const { bedFilter, bathFilter, petFilter, laundryFilter, styleFilter } = filterObject
        // console.log(bedFilter, bathFilter, petFilter)
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
        const { isBedFilterSelected: isBed,
            isBathFilterSelected: isBath,
            isPetFilterSelected: isPet,
            isStyleFilterSelected: isStyle,
            isLaundryFilterSelected: isLaundry } = this.state.filtersBoolean

        if (isBed && isBath && isPet && isStyle && isLaundry) {
            this.getFilterData(filters);
        }
        this.setState({
            open: !this.state.open
        })
        // console.log(filters)
    }

    handleClear = () => {
        // console.log("setstate to Null")
        this.getInitialData()
    }

    handleFilterButton = () => {
        // console.log('filter button')
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { propertyData, open } = this.state
        console.log(this.state.filtersBoolean)
        return (
            <div className='container'>
                <div className='navbar'>
                    <div className="dropdown" ref={this.container}>
                        <button className='btnfilter' onClick={this.handleFilterButton}>Filter</button>
                        {open && (
                            <div className="dropdown-content">
                                <div>
                                    <Filter
                                        filtersBoolean={this.state.filtersBoolean}
                                        filters={this.state.filters}
                                        setFilter={this.setFilter}
                                        handleClear={this.handleClear}
                                        handleDone={this.handleDone}
                                    />
                                </div>

                            </div>)}
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
                                    key={uuid.v4()}
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