# Horoscope
A small bot that will send you a daily horoscope + weather information and manage reminders for you.


## Development
- Create a Telnyx account, purchase a number, and assign it a messaging profile. Set the messaging profile webhook URL to `{APP_URL}:3030/messages/webhooks`.
- Run the application with `npm run dev:start`.
- Send a test message to your Telnyx number using one of the commands documented below, such as `/horoscopeon taurus`.


## List of supported commands (with examples):
```
/horoscopeon taurus
/horoscopeoff
/weatheron 12345
/weatheroff
/remindme5mins do something in 5 mins
/remindme2hrs do something in 2 hrs
/remindme12hrs do something in 12 hrs
/remindme24hrs do something in 24 hrs
/remindme1week do something in 1 week
/listreminders
/clearreminders
```

## Deployment

Install postgres, docker, and docker compose.

Edit your `/etc/postgresql/14/main/pg_hba.conf` to use peer md5 authentication for all hosts. This is necessary for your container to reach postgres, which is installed on the host. For added security, add a firewall on your VM that restricts incoming traffic to port 5432 to just the VM/security group.
```
# Database administrative login by Unix domain socket
local   all             postgres                                peer

# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             0.0.0.0/0               md5
# "local" is for Unix domain socket connections only
local   all             all                                     md5
```

Create a new user and database in postgres. Use psql to login as the user and create the tables found in `src/db/schema.sql`.

Create a `.env` in the root directory with the following values:
```
PG_USER=
PG_PASSWORD=
PG_HOST=<host IP address>
SMS_PROVIDER_FROM_NUMBER=<+15555555555>
TELNYX_API_KEY=
OPEN_WEATHER_MAP_API_KEY=
```

Run the docker container with `docker compose up`.