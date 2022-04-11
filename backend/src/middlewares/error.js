export const errorHandler = async (error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
}

export const error404Handler = async (req, res, next) => {
    let error = new Error("not found");
    error.status = 404;

    next(error);
}


// Based on https://levelup.gitconnected.com/how-to-handle-errors-in-an-express-and-node-js-app-cb4fe2907ed9