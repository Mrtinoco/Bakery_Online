class AppError extends Error {

    /**
     * @param message string
     * @param statusCode number
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
        this.isOperational = true;

        // Estos establecen el origen del error, en el código de línea cuando se creó la instancia de AppError
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError