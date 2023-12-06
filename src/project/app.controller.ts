import { Controller, Query, Get, Post, Body, Put, Param, createParamDecorator, ExecutionContext, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Project } from './project.models';
import { off } from 'process';


const QueryParam = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return { ...req.query, ...req.params };
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('projects')
  async createProject(@Body() SendProjectDto: Project) {
    return await this.appService.createProject(SendProjectDto)
  }

  @Get('projects')
  async findAll(@Query() { skip, limit }): Promise<Project[]> {
    // const count = (await this.appService.findAll(skip, limit)).length;

    return this.appService.findAll(skip, limit);
  }

  @Get('projects/count')
  async countAll() {
    return { count: await this.appService.countAll() }
  }


  @Get('projects/:id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.appService.findOne(id);
  }

  @Put('projects')
  async editProject(@Body() project: Project): Promise<Project> {
    console.log("project edited in controller: ", project);
    const projectEdited = await this.appService.editProject(project);
    return projectEdited;
  }

  @Delete('projects/:id')
  async delete(@Param('id') id: string): Promise<Project> {
    console.log("project delete in controller, id =  ", id);
    return this.appService.delete(id);
  }
}