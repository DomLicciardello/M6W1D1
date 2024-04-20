const logger = (req, res, next) => {
    //esempio middleware:
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`)
    //quando è stata effettuata la richiesta, il tipo di richiesta e la sorgente della richiesta
    next(); //dopo il middleware andrà avanti, altrimenti si bloccherebbe
};

export default logger;