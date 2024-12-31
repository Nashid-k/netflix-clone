import express from "express";
import { searchMovie,searchPerson,searchTv,getSearchHistory,removeItemFromSearchHistory,getPersonDetails,addToSearchHistory } from "../controllers/search.controller.js";
const router = express.Router();

router.get("/person/:query",searchPerson);
router.get("/person/details/:id", getPersonDetails); 
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);

router.post("/history", addToSearchHistory); 
router.get("/history",getSearchHistory);
router.delete("/history/:id",removeItemFromSearchHistory);




export default router;