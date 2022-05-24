import express from "express";

import { httpAddNewFamily, httpGetAllFamilies, httpGetFamilyById, httpUpdateFamily } from "./family.controller";

const familyRoute = express.Router();

familyRoute.get("/", httpGetAllFamilies);
familyRoute.get("/:id", httpGetFamilyById);

familyRoute.post("/", httpAddNewFamily);
familyRoute.patch("/", httpUpdateFamily);

export default familyRoute;
