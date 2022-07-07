

export default function TripOrder({ trip }) {
    console.log(trip)

    return (
        <>
        <h2>{trip.hotelName}</h2>
        <h3>{trip.roomName}</h3>
        <img src={trip.hotelPhoto} alt="" />
        <p></p>
        <p>Check-in: {trip.checkIn.slice(0, 10)} </p>
        <p>Check-out: {trip.checkOut.slice(0, 10)}</p>
        </>
    )
}