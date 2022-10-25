import { DocumentBuilder } from "@nestjs/swagger";

export class BaseApiDocument {
    public builder = new DocumentBuilder();

    public initializeOptions() {
        return this.builder
        .setTitle('Swagger')
        .setDescription('Swagger Study')
        .setVersion('1.0.0')
        //swagger에서 BearerAuth 인증
        .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
        'access-token',
        )
        .addTag('swagger')
        .build();
    }
}