import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Locations.css"

const API = 'http://localhost:8088'

export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    const navigate = useNavigate()

    useEffect (
        () => {
            fetch(`${API}/locations`)
            .then(response => response.json())
            .then(locationsArray => {
                setLocations(locationsArray)
            })
        },
        []
    )

    return <>
        
        <h2>List of Locations</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location">
                            <header>{location.address}</header>
                            <footer>{location.sqFt}sqFt</footer>
                        </section>
                    }
                )
            }
        </article>

        </>
        
}