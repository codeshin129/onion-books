set client_encoding = 'UTF8';

CREATE TABLE IF NOT EXISTS books (
    "id" VARCHAR(100) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "pages" INTEGER NOT NULL,
    PRIMARY KEY ("id")
)