## Deployment

Install postgres, docker, and docker compose.

Edit your `/etc/postgresql/14/main/pg_hba.conf` to use peer md5 authentication for all hosts. This is necessary for your container to reach postgres, which is installed on the host.For added security, add a firewall on your VM that restricts incoming traffic to port 5432 to just the VM/security group.
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