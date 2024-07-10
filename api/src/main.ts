import { NestFactory } from "@nestjs/core";
import { PokedexApiModule } from "./pokedex-api.module";

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.setGlobalPrefix("api");
  await app.listen(3000);
}

bootstrap();
