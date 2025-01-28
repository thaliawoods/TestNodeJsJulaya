CREATE TABLE access_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ttl INTEGER,
    createdAt TIMESTAMP
);