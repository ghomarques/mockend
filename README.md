# Mockend

<img src="./mockend-logo.svg" width="200px">

Mockend App reads the [.mockend.json](./.mockend.json) at the root level of this repo to automatically generate a public mock API.

## This Repo's API

-   [REST](https://mockend.com/ghomarques/mockend)
-   [GraphQL](https://mockend.com/ghomarques/mockend/graphql)

#

## Setup

```
    $ pnpm install;
```

#

## CLI Scripts

-   "pnpm dry-run": join the .json files at models folder into object and logs it
-   "pnpm generate": override current .mockend.json with the joined .json files at models folder
-   "pnpm push": execute git.sh, commit and pushe .mockend.json to repo
-   "pnpm update": execute "pnpm generate" and "pnpm push"

#

## References

-   [Mockend Homepage](https://mockend.com/)
-   [Mockend on GitHub Marketplace](https://github.com/marketplace/mockend)
-   [Mockend Docs](https://docs.mockend.com/)
