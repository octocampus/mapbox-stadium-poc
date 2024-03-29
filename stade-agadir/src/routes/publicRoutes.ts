import StadiumPage from "../pages/stadium/StadiumPage";
import { IRouteObject } from "../utils/interfaces";
import PATH from "./Path";
export const publicRoutes: IRouteObject[] = [
  {
    path: PATH.STADIUM_PAGE_PATH,
    name: "stadium",
    component: StadiumPage,
    isPublic: true,
    key: `${PATH.STADIUM_PAGE_PATH} _id`,
  },
];
