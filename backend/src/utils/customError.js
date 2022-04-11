export class CustomError extends Error {
    constructor(messge="Internal Server Error", status = 500) {
        super(messge)
        this.status = status;
    }
}