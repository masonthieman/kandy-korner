import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const CandyForm = () => {
    const [productTypes, setTypes] = useState([])
    const [candy, update] = useState({
        name: "",
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/types`)
            .then(response => response.json())
            .then((typeArray) => {
                setTypes(typeArray)
            })
        },
        []
    )
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const candyCreated = {
            typeId: candy.typeId,
            price: candy.price,
            name: candy.name
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(candyCreated)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    }

    return (
        <form className="candyForm">
            <h2 className="candyForm_title">New Candy Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter candy name"
                        value={candy.name}
                        onChange={
                            (event) => {
                                const copy = {...candy}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <Dropdown
                    label="Candy Type"
                    options={productTypes}
                    value={candy.typeId}
                    onChange={
                        (event)=> {
                            const copy = {...candy}
                            copy.typeId = parseInt(event.target.value)
                            update(copy)
                        }
                    } />
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Set the Price</label>
                    <input type="number"
                        value={candy.price}
                        onChange={
                            (event) => {
                                const copy = {...candy}
                                copy.price = parseFloat(event.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Create Product
            </button>
        </form>
    )
}

const Dropdown = ({label, options, onChange})  => {
    return (
        <label>
        {label}
        <select onChange={(event) => {onChange(event)}}>
            {options.map( (option) => {
               return <option value={option.id}>{option.name}</option>

            })}
        </select>
        </label>
        
    )
}