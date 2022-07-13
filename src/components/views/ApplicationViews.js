import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList.js"

export const ApplicationViews = () => {
	return (
		<Routes>
			
			<Route path="locations" element={ <LocationsList /> } />
		</Routes>

	
	)
}

