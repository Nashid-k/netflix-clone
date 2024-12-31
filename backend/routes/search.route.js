import express from "express";
import { searchMovie,searchPerson,searchTv,getSearchHistory,removeItemFromSearchHistory,getPersonDetails } from "../controllers/search.controller.js";
const router = express.Router();

router.get("/person/:query",searchPerson);
router.get("/person/details/:id", getPersonDetails); // Add this new route
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);

router.get("/history",getSearchHistory);
router.delete("/history/:id",removeItemFromSearchHistory);




export default router;