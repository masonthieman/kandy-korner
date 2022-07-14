import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList.js"
import { ProductsList } from "../products/ProductsList.js"
import { CandyForm } from "../forms/CandyForm.js"
export const ApplicationViews = () => {
	return (
		<Routes>
			
			<Route path="locations" element={ <LocationsList /> } />
			<Route path="products" element={ <ProductsList /> } />
			<Route path="product/create" element={ <CandyForm /> } />
		</Routes>

	
	)
}

