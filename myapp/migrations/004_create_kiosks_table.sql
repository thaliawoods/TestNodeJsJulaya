CREATE TABLE kiosks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    geolocation POINT
);