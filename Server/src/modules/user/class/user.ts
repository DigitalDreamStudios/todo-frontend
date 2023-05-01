import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    username: string;
    @Prop()
    email: string;
    @Prop()
    picture: string;
    @Prop()
    password: string;
}
