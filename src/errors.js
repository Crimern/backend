import errors, {defineError} from "inra-server-error";
import CustomError from "./api/errors/CustomError";
import mongoose from "mongoose";


defineError({instance: CustomError}, "CustomError");
defineError({
  instance: mongoose.Error.ValidationError,
  errorCode: 901,
  httpStatus: 400,
  userMessage: "Data validation failed"
})

export default errors;
