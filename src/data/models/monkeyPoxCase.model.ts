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
    required: true
  },
  age : {
    type: Number,
    required: true
  },
  creationDate : {
    type: Date,
    default: Date.now(),
  }
})

export const monkePoxCaseModel = mongoose.model("monkeyPoxCase", monkeyPoxCaseSchema)