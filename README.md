# onion-books
A journey to learn onion architecture.


## BookManagement
docker based application sample.
- `postgres` database 
- `typescript` && `express` app server

### install
```bash
npm install
```
### start
```bash
docker-compose up
```

### stop
```bash
docker-compose down
```

### endpoints sample
- `GET /books`
```bash
curl --location 'http://localhost:3000/books'
```

- `POST /books`
```bash
curl --location 'http://localhost:3000/books' \
--header 'Content-Type: application/json' \
--data '{
    "id": "testId",
    "title": "The Time Traveler'\''s wife",
    "author": "Audrey Niffenegger",
    "pages": 1203
}'
```

- `GET /books/{bookId}`
```bash
curl --location 'http://localhost:3000/books/testId'
```
