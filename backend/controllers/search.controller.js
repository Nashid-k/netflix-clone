import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log('Error in searchPerson controller');
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log('Error in searchMovie controller');
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function searchTv(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log('Error in searchTv controller');
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// New function to add to search history
export async function addToSearchHistory(req, res) {
    const { id, image, title, searchType } = req.body;
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id,
                    image,
                    title,
                    searchType,
                    createdAt: new Date()
                },
            },
        });
        res.status(200).json({ success: true, message: "Added to search history" });
    } catch (error) {
        console.log('Error in addToSearchHistory controller:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getPersonDetails(req, res) {
    const { id } = req.params;
    try {
        const [details, credits] = await Promise.all([
            fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}?language=en-US`),
            fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`)
        ]);

        res.status(200).json({
            success: true,
            content: {
                ...details,
                credits: credits
            }
        });
    } catch (error) {
        console.log('Error in getPersonDetails controller');
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });
        res.status(200).json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller : ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}