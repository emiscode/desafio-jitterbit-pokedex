# Jitterbit Challenge - Pokedex

- [Requirements](./requirements.md)

## Run

```bash
npm install
npm run start
```

- for both /api and /app

## Demo

[Link para a demo [PT-BR]](https://www.loom.com/share/8a0c12faaa55478dae37c4066fc927ba)

[Link to the demo [English Version]](https://www.loom.com/share/043bdc21fbba479baf3945f58c41f764)

## Building and Running the Docker Container

### /api

```bash
docker build -t nestjs-pokemon-api .
```

```bash
docker run -p 3000:3000 nestjs-pokemon-api
```
