# instask

### Installation

Run postgress and create `instask` database

```
docker run --name instask -e POSTGRES_USER=user -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres 
```

```
cd web
cp .env.example .env
npm install
npm run dev
```

```
cd server
cp .env.example .env
npm install
npm run dev
```