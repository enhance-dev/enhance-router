#! /usr/bin/env node
import { copyFileSync, unlinkSync } from 'fs'
import { copySync } from 'fs-extra'

try {
  unlinkSync('./public/router.mjs')
}
catch (err) {
  // Ignore error trying to remove non-existent file.
}

copyFileSync('./index.mjs', './public/router.mjs')
copySync('./lib', './public/lib')
