import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { messageParamCompletedBoolean, messageParamDescriptionString, messageParamTitleEmpty, messageParamTitleString } from "src/utils/message";

export class CreateTaskDto {
    @IsNotEmpty({ message: messageParamTitleEmpty })
    @IsString({ message: messageParamTitleString })
    title: string;

    @IsOptional()
    @IsString({ message: messageParamDescriptionString })
    description: string;

    @IsOptional()
    @IsBoolean({ message: messageParamCompletedBoolean})
    completed: boolean;
}