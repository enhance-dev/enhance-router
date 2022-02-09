#! /usr/bin/env node
import { copyFileSync, unlinkSync } from 'fs'

try {
  unlinkSync('./public/router.mjs')
}
catch (err) {
  // Nothing to see here
}
copyFileSync('./index.mjs', './public/router.mjs')
