# The Callenge of Increasing Complexity

## Implementing the basics
- Creating the code base
- Defining the initial structure of the data to be synchronized
- Getting data by comparing timestamps
- Two-way synchronizing
- Things that went wrong while implementing the basic
    - Passing a data store from the server to the client does not make sense Making the relationships clear.

## Growing features
- Synchronizing multiple imtes
    - Simply replacing data type with an array
    - Server-centered synchronization
        - Synchronizing from the server to the client
        - Synchronizing from client to server
    - Synchronizing multiple types of data
    - Supporting multiple clients with incremental data
        - Updating the client side
        - Updating server side
    - Supporting more conflict merging
        - New data structures
        - Updating client side
        - Updating the server side
    - Things that go wrong while implementing everything
        - Piling up similar yet parallel processes
        - Data stores that are tremendously simplified

## Getting things right
- Finding abstraction
- Implementing strategies
- Wrapping stores

## Summary