import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop()
    id: string;

    @Prop({ index: true, text: true })
    title: string;

    @Prop()
    shortDescription: string;

    @Prop()
    description: string;

    @Prop()
    mainImage: string;

    @Prop()
    dateAdded: number;

    timestamps: true

}


export const ProjectSchema = SchemaFactory.createForClass(Project);


