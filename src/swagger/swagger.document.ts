import { DocumentBuilder } from "@nestjs/swagger";

export class BaseApiDocument {
    public builder = new DocumentBuilder();

    public initializeOptions() {
        return this.builder
        .setTitle('Swagger')
        .setDescription('Swagger Study')
        .setVersion('1.0.0')
        .addTag('swagger')
        .build();
    }
}