# Como Estas MongoDB persistence layer

This module is used for the Como Estas On-Premise version. If you want to implement Como Estas in a Public Cloud environment use these links:

- [Como Estas - AWS Serverless](https://github.com/quedate-en-casa/comoestas-serverless)
- [Como Estas - AWS Terraform](https://github.com/quedate-en-casa/comoestas-serverless)
- [Como Estas - AWS DynamoDB](https://github.com/quedate-en-casa/comoestas-serverless)

## Requirements

To develop over this project you need `Docker` (basically is needed for integration tests with testcontainers), `Node.js` and `Yarn`.

## Getting started

To use-test this project you must link the `comoestas-core` package.

First, clone the core repository and link it.

```shell
git clone https://github.com/quedate-en-casa/comoestas-core.git
cd comoestas-core
yarn link
```

Then, link the `core` package to your local project.

```shell
yarn link comoestas-core
```

To check whether your local environment works run `yarn test`.

## TODO

- [ ] Add validations
- [ ] Add index for rut fields
- [ ] Refactor integrations test
- [ ] Add continous integration
- [ ] Add more documentation
