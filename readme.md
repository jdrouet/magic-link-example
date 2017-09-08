# magic link server

## install locally

```bash
docker run -d -p 5433:5432 --name postgres postgres
docker run -d -p 2525:25 --name fakesmtp munkyboy/fakesmtp
docker exec -i -t postgres createuser -h localhost -U postgres --superuser omts
docker exec -i -t postgres createdb -h localhost -U postgres --owner omts omts-magic-link
npm install
npm run migrate
npm start
```

## run the tests

```bash
npm test
```
