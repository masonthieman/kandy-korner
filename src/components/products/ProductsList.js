import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

const API = 'http://localhost:8088'

export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [showTop, updateShowTop] = useState(false)
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)

    useEffect( 
        () => {
             
            fetch(`${API}/products?_expand=type&_sort=name`)
            .then(response => response.json())
            .then(
                (productArray) => {
                    setProducts(productArray) 
                    setFiltered(productArray)
                }
            )
        },
        []
    )

    useEffect(
        () => {
                const pricedProductsArray = products.filter( product=> {
                  return product.price > 2.00
                })
                setFiltered(pricedProductsArray)
        }
    ,
    [showTop]
    )
    
    return <>

        <h2>List of Products</h2>

        <button onClick={ () => { updateShowTop(true) } }>Top Priced</button>
        {
            kandyUserObj.staff
                ? <>
                    <button onClick={() => navigate("/product/create")}>Create Product</button>
                </>
                    : 
                    ""
                    
        }
        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product">
                            <header>{product.name}</header>
                            <div>Type:{product.type.name}</div>
                            <footer>Price: ${Number(product.price).toFixed(2)}</footer>
                        
                        </section>
                    }
                )
            }
        </article>
    </>
}
