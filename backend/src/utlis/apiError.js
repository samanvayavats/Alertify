class apiError extends Error {
    constructor(message = "something went wring",
        statusCode,
        error = [],
        stack = "") {

        super(message)
        this.data = null
        this.message = message
        this.succes = false
        this.error = error
        this.statusCode = statusCode
        
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export {apiError}
