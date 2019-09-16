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
                bedFilter: '',
                bathFilter: '',
                petFilter: '',
                laundryFilter: '',
                styleFilter: '',
                minPrice: "",
                maxPrice: "",

            },
            filtersBoolean: {
                isBedFilterSelected: false,
                isBathFilterSelected: false,
                isPetFilterSelected: false,
                isLaundryFilterSelected: false,
                isStyleFilterSelected: false,
                isMinPriceSelected: false,
                isMaxPriceSelected: false,

            },
            open: false,
            isLoading: true,
        }
    }
    container = React.createRef();

    handleClickOutside = (e) => {
        if (this.container.current && (!this.container.current.contains(e.target))) {
            this.setState({
                open: false
            })
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillMount() {
        this.getInitialData()
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    setFilter = ({ key, value }, bool) => (
        this.setState((state) => ({ filters: { ...state.filters, [key]: value } }))
    )

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
                    propertyData: data,
                    isLoading: false
                })
            })


    }

    getFilterData(filterObject) {
        const { bedFilter, bathFilter, petFilter, laundryFilter, styleFilter, minPrice, maxPrice } = filterObject
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
                    if (bedFilter === 'ALLBEDS' && parseInt(bathFilter) == property.bath
                        && (petFilter === property.pets_allowed || petFilter === null)
                        && laundryFilter === property.laundry && styleFilter === property.property_type
                        && (property.price >= minPrice && property.price <= maxPrice)) {
                        acc.push(property)
                    }
                    else if (bathFilter === 'ALLBATHS' && parseInt(bedFilter) === property.beds
                        && (petFilter === property.pets_allowed || petFilter === null)
                        && laundryFilter === property.laundry && styleFilter === property.property_type
                        && (property.price >= minPrice && property.price <= maxPrice)) {
                        acc.push(property)
                    }
                    else if (bathFilter === 'ALLBATHS' && bedFilter === 'ALLBEDS'
                        && (petFilter === property.pets_allowed || petFilter === null)
                        && laundryFilter === property.laundry && styleFilter === property.property_type
                        && (property.price >= minPrice && property.price <= maxPrice)) {
                        acc.push(property)
                    } else if (parseInt(bedFilter) === property.beds && parseFloat(bathFilter) == property.bath
                        && (petFilter === property.pets_allowed || petFilter === null)
                        && laundryFilter === property.laundry && styleFilter === property.property_type
                        && (property.price >= minPrice && property.price <= maxPrice)) {
                        acc.push(property)
                    }
                    return acc
                }, [])
                this.setState({
                    propertyData: filteredProperty,
                    isLoading: false
                })
            })

    }

    handleDone = () => {
        const { filters } = this.state
        const {
            isBedFilterSelected: isBed,
            isBathFilterSelected: isBath,
            isPetFilterSelected: isPet,
            isStyleFilterSelected: isStyle,
            isLaundryFilterSelected: isLaundry,
            isMinPriceSelected: isMin,
            isMaxPriceSelected: isMax } = this.state.filtersBoolean

        if (isBed && isBath && isPet && isStyle && isLaundry && isMin && isMax) {
            this.setState({ isLoading: true }, () => {
                this.getFilterData(filters);
            })
        }
        this.setState({
            open: !this.state.open
        })
    }

    handleClear = () => {
        this.setState({ isLoading: true }, () => {
            this.getInitialData()
        })

    }

    handleFilterButton = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { propertyData, open, isLoading } = this.state
        // console.log(isLoading)
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
                {isLoading ? <div className='loading'><h2>Loading...</h2></div> :
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
                    </div>}
            </div>
        )
    }
}