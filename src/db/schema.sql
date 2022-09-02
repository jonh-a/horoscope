CREATE TABLE users (
  phone_number    BIGINT      PRIMARY KEY   NOT NULL,
  horoscope       BOOLEAN,
  zodiac          VARCHAR(50),
  weather         BOOLEAN,
  city            VARCHAR(100),
  state           VARCHAR(100)
);

CREATE TABLE reminders (
  id              VARCHAR(100)  PRIMARY KEY  NOT NULL,
  phone_number    BIGINT        NOT NULL,
  reminder        VARCHAR(1000) NOT NULL,
  remind_at       BIGINT        NOT NULL,
  reminded        BOOLEAN       NOT NULL
);