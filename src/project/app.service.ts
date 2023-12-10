import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, ProjectDocument } from './project.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {

  constructor(
    @InjectModel('project') private readonly projectModel: Model<ProjectDocument>
  ) { }


  async createProject(project: Project): Promise<Project> {
    const newProject = new this.projectModel(project);
    console.log("newProject = ", newProject)
    newProject.id = uuidv4();
    return newProject.save();
  }


  async countAll() {
    return await this.projectModel.countDocuments();
  }

  async findProjects(query = "", page?: number) {
    console.log("skip, limit = ", query, page)
    return await this.projectModel.find(
      { $text: { $search: query } }
    ).sort({ dateAdded: -1 }).skip(page)
    //.sort({ dateAdded: -1 }).limit(limit).skip(skip)


  }

  async findAll() {
    return await this.projectModel.find().exec();
  }



  async findOne(id: string): Promise<Project> {
    return this.projectModel.findOne({ id: id }).exec();
  }


  async editProject(project: Project) {
    const foundedProject = await this.projectModel.findOne({ id: project.id }).exec();
    if (!foundedProject) {
      console.log("Project by id = " + project.id + " not found!");
      throw new NotFoundException();
    }
    const updatedProject = await this.projectModel.findByIdAndUpdate({ _id: foundedProject._id }, project)
      .setOptions({ overwrite: true, new: true });
    if (!updatedProject) {
      console.log("Project by id = " + project.id + " could not be updated!");
      throw new NotFoundException();
    }
    return updatedProject;
  }


  async delete(id: string) {
    const foundedProject = await this.projectModel.findOne({ id: id }).exec();
    console.log("foundedProject = ", foundedProject, id);
    if (!foundedProject) {
      console.log("Project by id = " + id + " not found!");
      throw new NotFoundException();
    }
    const deletedProject = await this.projectModel.findByIdAndDelete(foundedProject._id).exec();
    return deletedProject;
  }

}