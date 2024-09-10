import {Request, Response} from "express"
import { monkeyPoxCaseModel } from '../../../data/models/monkeyPoxCase.model';
import mongoose from "mongoose";

export class monkeyPoxCaseController {
  public getCases = async (req:Request, res: Response) => {
    try {
      const cases = await monkeyPoxCaseModel.find();
      if(cases.length > 0) {
        return res.json(cases)
      }
      return res.json({message: "There are no cases yet, maybe create one?"})
    } catch (error) {
      res.json({message: "Erro fetching the cases"});
    }
  }

  public createCase = async (req:Request, res: Response) => {
    try {
      const {lat, lng, genre, age} = req.body
      const newCase = await monkeyPoxCaseModel.create({
        lat,
        lng,
        age,
        genre
      })
      res.json(newCase)
    } catch (error) {
      res.json({message: "Error creating a new case"});
    }
  }

  public getCaseById = async(req:Request, res:Response) => {
    try {
      const {id} = req.params;

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({message: "Please provide a valid id"})
      }

      const foundCase = await monkeyPoxCaseModel.findById(id);

      if(!foundCase){
        return res.json({message: `Case with id: ${id} not found`})
      }

      return res.json(foundCase)
    } catch (error) {
      return res.json({message: "Error while fetching Case by id"})
    }
  }

  public getLastWeekCases = async(req:Request, res:Response) => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const cases = await monkeyPoxCaseModel.find({creationDate: {$gte: oneWeekAgo}})

      if(cases.length <= 0){
        return res.json({message: "There have been no cases registered within last week"})
      }
      return res.json(cases)
    } catch (error) {
      return res.json({message: "Error while fetching last week cases"})
    }
  }

  public updateCase = async(req:Request, res:Response) => {
    try {
      const {id} = req.params;

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({message: "Please provide a valid id"})
      }

      const foundCase = await monkeyPoxCaseModel.findById(id);

      if(!foundCase){
        return res.json({message: `Case with id: ${id} not found`})
      }

      const { lat, lng, genre, age } = req.body;

      await monkeyPoxCaseModel.findByIdAndUpdate(id, {
        lat: lat !== undefined ? lat : foundCase.lat,
        lng: lng !== undefined ? lng : foundCase.lng,
        genre: genre !== undefined ? genre : foundCase.genre,
        age: age !== undefined ? age : foundCase.age
      })

      const updatedCase = await monkeyPoxCaseModel.findById(id);
      return res.json(updatedCase)
    } catch (error) {
      return res.json({message: "Error while updating case"})
    }
  }

  public deleteCaseById = async(req:Request, res:Response) => {
    try {
      const {id} = req.params;

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({message: "Please provide a valid id"})
      }

      const foundCase = await monkeyPoxCaseModel.findById(id);

      if(!foundCase){
        return res.json({message: `Case with id: ${id} not found`})
      }

      await monkeyPoxCaseModel.findByIdAndDelete(id);
      return res.json({message:`Case with id: ${id} was deleted succesfuly`})
    } catch (error) {
      return res.json({message: "Error while fetching Case by id"})
    }
  }
}