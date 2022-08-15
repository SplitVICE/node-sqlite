-- Drops cat table.
DROP TABLE IF EXISTS cats;

-- Creates cat table.
CREATE TABLE CAT (
  ID INTEGER PRIMARY KEY UNIQUE,
  NAME TEXT NOT NULL,
  BIRTH_DATE TEXT NOT NULL
);

-- Inserts some cats into the table.
INSERT INTO CAT (NAME, BIRTH_DATE) VALUES ('Garfield', '1979-01-01');
INSERT INTO CAT (NAME, BIRTH_DATE) VALUES ('Fuzzy', '1980-01-01');
INSERT INTO CAT (NAME, BIRTH_DATE) VALUES ('Scratchy', '1981-01-01');
INSERT INTO CAT (NAME, BIRTH_DATE) VALUES ('Tom', '1982-01-01');