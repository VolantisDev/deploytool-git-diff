Deploytool-git-diff
==========

An extension for Deploytool that gets a diff of files that have changed between commits

## Installation

    npm install deploytool-git-diff --save

## Usage

    var deploytool = require('deploytool');

    deploytool.deploy('production', 'e8ac002dc64111fce77c9c9d12c28c13c3f98aa2');

## Contributing

Take care to follow the same patterns as other Deploytool modules.

Don't extend Deplyotool itself to add new deployment types. Simply create new modules
prefixed with **deploytool-** that has a "deploy" method in it.
