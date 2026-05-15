# Database Connection Notes

The database feature uses a simple in-memory database client for this checkpoint.

## Environment Variables

The connection layer reads these optional variables:

- DB_DRIVER
- DB_NAME
- DB_HOST
- DB_PORT
- DB_USER

## Functions Added

- connect()
- getClient()
- query()
- normalizeConfig()

## Testing

The existing smoke test checks that connect() returns an object and that connected is true.
