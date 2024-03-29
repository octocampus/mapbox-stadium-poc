/*
Routes construction
*/
import { Route, Routes } from 'react-router-dom'
import { IRouteObject } from '../utils/interfaces'
import routes from '.'

const getRoutes = (routes: IRouteObject[]) => {
	return routes.map(route => {
		const Component = route.isPublic ? (
			<route.component />
		) : (
            <>
            </>
		)

		if (route.nestedRoutes) {
			return (
				<Route key={route.key} path={route.path} element={Component}>
					{getRoutes(route.nestedRoutes)}
				</Route>
			)
		} else {
			return <Route key={route.key} path={route.path} element={Component} />
		}
	})
}

const AppRoutes = () => {
	return (
		<Routes>
			{getRoutes(routes)}
		</Routes>
	)
}

export default AppRoutes