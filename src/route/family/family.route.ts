import express from "express";

import { httpAddNewFamily, httpGetAllFamilies } from "./family.controller";

const familyRoute = express.Router();

familyRoute.get("/", httpGetAllFamilies);

//TODO add a route to get a family by ID
//familyRoute.get("/:id", httpGetFamilyById);

familyRoute.post("/", httpAddNewFamily);

//TODO add a route to update a family
//TODO change leave Date and add absente dates
//familyRoute.post("/", httpUpdateFamily);

export default familyRoute;
