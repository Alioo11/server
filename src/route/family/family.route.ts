import express from "express";

import { httpAddNewFamily, httpGetAllFamilies, httpGetFamilyById } from "./family.controller";

const familyRoute = express.Router();

familyRoute.get("/", httpGetAllFamilies);

familyRoute.get("/:id", httpGetFamilyById);

familyRoute.post("/", httpAddNewFamily);

//TODO add a route to update a family
//TODO change leave Date and add absente dates
//familyRoute.post("/", httpUpdateFamily);

export default familyRoute;
