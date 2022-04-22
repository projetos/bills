import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Bills')
  .setDescription('Bills - Challenge documentation API')
  .setVersion('0.0.1')
  .build();
