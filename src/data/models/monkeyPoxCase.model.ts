import mongoose from "mongoose";

const monkeyPoxCaseSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  isSent : {
    type: Boolean,
    default: false
  },
  genre : {
    type: String,
    required: true,
    lowercase:true,
    enum: ["male","female","other"]
  },
  age : {
    type: Number,
    required: true,
    min:0,
    max:150,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  creationDate : {
    type: Date,
    default: Date.now(),
  }
})

export const monkeyPoxCaseModel = mongoose.model("monkeyPoxCase", monkeyPoxCaseSchema)