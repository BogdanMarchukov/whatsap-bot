import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum TypeMessage {
  imageMessage = 'imageMessage',
  videoMessage = 'videoMessage',
  documentMessage = 'documentMessage',
  audioMessage = 'audioMessage',
  textMessage = 'textMessage',
}

@Exclude()
export class instanceDataDTO {
  @Expose()
  @IsNumber()
  idInstance: number;

  @Expose()
  @IsString()
  wid: string;

  @Expose()
  @IsString()
  typeInstance: string;
}

@Exclude()
export class senderDataDTO {
  @Expose()
  @IsString()
  chatId: string;

  @Expose()
  @IsString()
  sender: string;

  @Expose()
  @IsString()
  senderName: string;
}

@Exclude()
export class FileMessageDataDTO {
  @Expose()
  @IsString()
  downloadUrl: string;

  @Expose()
  @IsString()
  caption: string;
}

@Exclude()
export class TextMessageDataDTO {
  @Expose()
  @IsString()
  textMessage: string;
}

@Exclude()
export class MessageDataDTO {
  @Expose()
  @IsEnum(TypeMessage)
  typeMessage: TypeMessage;

  @Expose()
  @IsOptional()
  @Type(() => FileMessageDataDTO)
  fileMessageData?: FileMessageDataDTO;

  @Expose()
  @IsOptional()
  @Type(() => TextMessageDataDTO)
  textMessageData?: TextMessageDataDTO;
}

@Exclude()
export class InputMessageDTO {
  @Expose()
  @IsString()
  typeWebhook: string;

  @Expose()
  @ValidateNested()
  @Type(() => instanceDataDTO)
  instanceData: instanceDataDTO;

  @Expose()
  @IsNumber()
  timestamp: number;

  @Expose()
  @IsString()
  idMessage: string;

  @Expose()
  @ValidateNested()
  @Type(() => senderDataDTO)
  senderData: senderDataDTO;

  @Expose()
  @ValidateNested()
  @Type(() => MessageDataDTO)
  messageData: MessageDataDTO;
}
