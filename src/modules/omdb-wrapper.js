import axios from "axios";
import https from "https";

const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };
    
    // hacer la función
    return returnObject;
    };

const OMDBSearchComplete = async (searchText) => {
    let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };
    
    // hacer la función
    return returnObject;
};

const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };
    // hacer la función
    return returnObject;
};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID}