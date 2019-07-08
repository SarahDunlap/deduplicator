# Deduplicate CLI

Deduplicate CLI is a tool that will take identically structured json records and deduplicate the set with the following rules:

1. The data from the newest date should be preferred

2. duplicate IDs count as dups. Duplicate emails count as dups. Both must be unique in our dataset. Duplicate values elsewhere do not count as dups.

3. If the dates are identical the data from the record provided last in the list should be preferred

A log file of the original content, deduplicated leads, and a list of the changes will be created. Also, a json file with a list of unique leads will be created.

# Installation

To install simply clone the project, and run the following:

## Development

```
cd deduplicator
npm install && npm link
```

## Production

```
cd deduplicator
npm install -g ./
```

# Getting Started

If you would like to use an already available list of json records, you can run the following:

```
deduplicate --demo
```

Otherwise, you can provide the filepath to the json file you would like to deduplicate. Example:

```
deduplicate --file-path C:\some-file-path.json
```
List of all options:

```
-v, --version           output the version number
-d, --demo              use demo file for deduplication
-f, --file-path <path>  use specified path to file for deduplication
-o, --output <path>     use specified path for log file & unique leads file
-s, --silent            silent console display of output
-h, --help              show help
```
