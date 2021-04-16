# Common JS library

## Adding to project
```
$ yarn add @common@github:https://github.com/evocatv/evoca-common-js-library.git
```

## Upgrading
```
$ yarn upgrade @common
```


## Using linter
Create this file at `./.eslintrc.js`
```
module.exports = require('@common/linters/node');
```

## Using logger
```
const Logger = require('@common/utils/logger');
const logger = new Logger(__filename);
```

## Optional log settings

The following log settings are changed by setting environment variables.

    Enable Log Colors
    - LOG_COLORS=true

    Remove date from timestamp
    - LOG_SHORT_TIME=true

    Include parent directory in basename
    - LOG_SHOW_PARENT=true

    Change timezone
    - DEFAULT_TIMEZONE = 'America/Los_Angeles'