# FILTER-FUNCTION

> A base on js npm pack. Provide more filter methods for your project

## Build Setup

# dev

```sh
# start the project
npm run build-w
# Start a server port for the index.html file in the root directory
Live Server or Http-server
```

# Refer to the esdoc documentation for function comments

https://esdoc.org/manual/tags.html

# Quick Use

```sh
# Generate doc
npm run doc

# Build
npm run build

# Move to dist directory
cd dist

# Create a configuration file.
echo '{
  "name": "hs-filter",
  "description": "A base on js npm pack. Provide more filter methods for your project",
  "version": +++,
  "author": "wxp <15803305146@163.com>",
  "main": "dist/index.js",
  "license": "MIT",
  "private": false,
}' > package.json

# Pack

npm pack

# Install npm pack in your project

npm install -D '.\packName.tgz'

# The exmple in the project
- [vue] import 'name' from 'packName'
- [html] <script src="packName"></script>
```

# License

MIT

# Author

[wxp<15803305146@163.com>]
