import React from 'react'

function PropertyCard(props) {
    return (
        <div>
            <div className="card">
                <img src="https://cdn.pixabay.com/photo/2015/05/15/14/48/house-768707_960_720.jpg" alt="Avatar" />
                <div className="cardItem">
                    <h4><b>Appartment Name</b></h4>
                    <p>{props.Address}</p>
                    <span>
                        <span> {props.PropertyType}</span> |
                        <span> {props.Beds} - Beds</span> |
                        <span> {props.Baths} - Bath</span> |
                        <span> {props.Pets} Allowed</span> |
                        <span> {props.Laundry} </span> </span>
                    <p>Price: {props.Price} $</p>
                    <div>
                        <button className='btn-email'>Email</button>
                        <button className='btn-phone'>Phone Number</button><br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (PropertyCard)
