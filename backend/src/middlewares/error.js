import { CustomError } from "../utils/customError";

export const errorHandler = async (error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
}

export const error404Handler = async (req, res, next) => {
    next( new CustomError("Not found", 404) );
}


// Based on https://levelup.gitconnected.com/how-to-handle-errors-in-an-express-and-node-js-app-cb4fe2907ed9