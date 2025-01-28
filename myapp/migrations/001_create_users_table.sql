CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    countryCode VARCHAR(10),
    phone VARCHAR(20),
    password VARCHAR(255),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);
