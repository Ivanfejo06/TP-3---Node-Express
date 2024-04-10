import axios from "axios";
import https from "https";

const APIKEY = "a7d58067";

const OMDBSearchByPage = async (searchText, page) => {
    const requestString = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    const apiResponse = await axios.get(requestString, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Ignora la validación del certificado SSL
    });
    return apiResponse.data;
};

const OMDBSearchComplete = async (searchText) => {
    const requestString = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`;
    const apiResponse = await axios.get(requestString, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Ignora la validación del certificado SSL
    });
    return apiResponse.data;
};

const OMDBGetByImdbID = async (imdbID) => {
    const requestString = `https://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
    const apiResponse = await axios.get(requestString, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Ignora la validación del certificado SSL
    });
    return apiResponse.data;
};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID}