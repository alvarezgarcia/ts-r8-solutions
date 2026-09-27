# Welcome to the machine

This repo contains suggested solutions to the challenges in the R8 emulator project, described here:

* [Welcome to the machine: emulating a CPU](https://bitfieldconsulting.com/posts/welcome-to-machine)

Each branch (e.g.: `r8_1`) contains the solution for a specific challenge.

## Setup
With at least node `20.19+` version install the dependencies:
```
$ npm i
```

## Tools

### Monitor

#### Default
```
$ npm run monitor
```

#### Run a program directly from stdin
```
$ npm run monitor '16 07 48' # LD_A 07 \
                             # INC_A
```
Single quotes are mandatory for now

### Makebin
```
$ npm run makebin ./output.bin '16 07 48' # LD_A 07 \
                                          # INC_A
```
Single quotes are mandatory for now

## Test
```
$ npm test
```
