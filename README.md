# SCooP

SCooP is a modern, free, and open source SFTP, SCP, and FTP client written
in [Electron](https://github.com/electron/electron). We use Electron with the
hope to make contributing to this project accessible for more people.

## Build Setup

First, clone the repo:

```bash
git clone git@github.com:blunket/SCooP.git

# or if you prefer HTTPS:
git clone https://github.com/blunket/SCooP.git
```

You likely want to checkout the `develop` branch before continuing.

```bash
git checkout develop
```

We prefer yarn over npm. To install dependencies, simply run `yarn`.

Other commands:

``` bash
# serve the application with hot reload at localhost:9080
yarn run dev

# build Electron application for production
yarn run build

# run unit tests
yarn test

# lint all JS/Vue component files in `src/`
yarn run lint
```

## Contributing

Please review our [contribution guidelines](CONTRIBUTING.md).

To make changes, branch off of `develop`. Then, make your changes on that branch
and submit a pull request for code review.
