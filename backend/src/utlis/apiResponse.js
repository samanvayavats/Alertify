class apiRespone{
    constructor(statuscode ,data , message ="succes" ){
        this.statuscode =statuscode
        this.data = data
        this.message = message
        this.success = statuscode<400
    }
}

export  default apiRespone