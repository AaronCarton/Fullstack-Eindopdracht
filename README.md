# Fullstack-Eindopdracht: Pizza Time

## Setup
Het project kan je makkelijk opstarten via Docker
#### Env
Vul eerst je `.env` files in, er zijn `env.example` files aanwezig om je te helpen onder `/pwa` & `/api`

#### Docker Compose
```yml
version: '3.1'
services:
  pwa:
    depends_on:
      - api
    container_name: pizzatime_pwa
    build: 
      context: ./pwa
      dockerfile: Dockerfile
    environment:
      API_URL: http://localhost:3006/graphql
    ports:
      - 8090:8082
  api:
    depends_on:
      - mongodb
    container_name: pizzatime_api
    build: 
      context: ./api
      dockerfile: Dockerfile
    environment:
      MONGO_URI: mongodb://mongodb:27017/project_api
      GOOGLE_APPLICATION_CREDENTIALS: /run/secrets/gcp-credentials
    secrets:
      - gcp-credentials
    ports:
      - 3006:3006
  mongodb:
    image: mongo
    restart: on-failure:5
    ports:
      - 27007:27017
    environment:
      MONGO_INITDB_DATABASE: project_api
    volumes:
      - fswdProjectVolume:/data/db

volumes:
  fswdProjectVolume:
    name: fswd_MongoDB

secrets:
  gcp-credentials:
    file: PATH_TO_FIREBASE_CREDENTIALS.JSON
```
**!Vergeet niet het pad naar je firebase credentials.json op de laatste lijn in te stellen!**

#### Database seeding
Waarschijnlijk zal je daarna je database willen seeden met wat data, dit kan je doen via de volgende command uit te voeren in de `/api` folder
```
npx nestjs-command seed:database
```

#### Extra: Admin user
Na het aanmaken van een new user zal je deze een admin role moeten geven om toegang te krijgen tot alle features.
Ga naar `user` collection in MongoDB, daar pas je de `role` field van je user aan naar `2`
