CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users(
    UserId       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    TelegramId   BIGINT
    --CacheAmmount NUMERIC(10, 2)
);

CREATE TABLE Movements(
    MovementId   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    UserId       UUID,
    MoneyAmmount NUMERIC(10, 2),
    Category     VARCHAR(16)      default 'Spese',
    Comment     VARCHAR(64),
    CONSTRAINT UserMovement FOREIGN KEY (UserId) REFERENCES Users (UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
