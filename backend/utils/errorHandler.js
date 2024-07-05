class ErrorHandler extends Error {
  //Error is a default class from the js
  constructor(message, statuscode) {
    //this constructor comes under the error class, basically these are the default structure of the error class
    super(message); //this is also a constructor, used to call the parent class to send these (message,statuscode) parameters
    this.statuscode = statuscode;

    //stack is a property from the Error class ,this will automatically show the correct error

    Error.captureStackTrace(ErrorHandler, this.constructor);
  }
}

module.exports = ErrorHandler; 
