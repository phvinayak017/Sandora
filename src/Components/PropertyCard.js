import React from 'react'

function PropertyCard(props) {
    return (
        <div>
            <div class="card">
                <img src="https://cdn.pixabay.com/photo/2015/05/15/14/48/house-768707_960_720.jpg" alt="Avatar" />
                <div class="container">
                    <h4><b>Appartment Name</b></h4>
                    <p>{props.address}</p>
                    <p>{props.propertyType}</p>
                    <span>
                        <p>{props.Beds} - Beds</p>
                        <p>{props.Baths} - Bath</p>
                        <p>{props.Price} $</p>
                    </span>
                    <div>
                        <button>Email</button>
                        <button>Phone Number</button><br />
                    </div>
                </div>
            </div> <br />
        </div>
    )
}

export default (PropertyCard)
