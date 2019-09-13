import React, { Component } from 'react'
import Axios from 'axios'
import Filter from './Filter'


export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyData: [],
<<<<<<< HEAD
            filters:{
                bedfilter: 'isAllBeds',
                bathFilte:'isAllBaths',
                petFilter:'cat',
                laundryFilter:'Apartment'
=======
            filters: {
                isAllBeds: false,
                isOneBed: false,
                isTwoBed: false,
                isThreeBed: false,
                iFourPlusBed: false,
                isStudio: false,
                isOnePlusBaths: false,
                isTwoPlusBaths: false,
                isThreePlusBaths: false,
                isAllBath: false,
                isDogs: false,
                isCats: false,
                isBothPets: false,
                isApartments: false,
                isCondos: false,
                isHouse: false,
                isTowmhomes: false,
                isInUnit: false,
                isHookups: false,
                isOnSite: false,
>>>>>>> 60fc107758eaf3bad9c5f29008ac6bc1bb510b73
            }
        }
    }

<<<<<<< HEAD
    setFilter = ({key, value}) => (
        this.setState((state) => ({ filters: {...state.filters, [key]: value }}))
=======
    setFilter = ({ key, value }) => (
        this.setState((state) => ({ filters: { ...state.filters, [key]: value } }))
>>>>>>> 60fc107758eaf3bad9c5f29008ac6bc1bb510b73
    )

    componentDidMount() {
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
                this.setState({
                    propertyData: data
                })
            })
    }

    handleClick = () => {
        console.log(this.state.propertyData)
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
                                    bedFilter={this.state.beds}
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
                    {/* <button
                        onClick={this.handleClick}
                    >Get Data</button> */}
                </div>

            </div>
        )
    }
}