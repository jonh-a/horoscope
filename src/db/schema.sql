CREATE TABLE users (
  phone_number    INT         PRIMARY KEY   NOT NULL,
  horoscope       BOOLEAN     NOT NULL,
  zodiac          VARCHAR(50)
);

CREATE TABLE reminders (
  id              VARCHAR(100)  PRIMARY KEY  NOT NULL,
  phone_number    BIGINT        NOT NULL,
  reminder        VARCHAR(1000) NOT NULL,
  remind_at       BIGINT        NOT NULL,
  reminded        BOOLEAN       NOT NULL
);