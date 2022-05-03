import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

enum TypeMessage {
  imageMessage = 'imageMessage',
  videoMessage = 'videoMessage',
  documentMessage = 'documentMessage',
  audioMessage = 'audioMessage',
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
  @IsEnum(TypeMessage)
  typeMessage: TypeMessage;

  @Expose()
  @ValidateNested()
  @Type(() => FileMessageDataDTO)
  fileMessageData: FileMessageDataDTO;
}