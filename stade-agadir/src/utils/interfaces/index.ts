export * from "./map/InitialMapState";


export interface IRouteObject {
    path: string
    name: string
    component: any
    isPublic: boolean
    key: string,
    nestedRoutes?: IRouteObject[],
  }