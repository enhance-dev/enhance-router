#! /usr/bin/env node
import { copySync, emptyDirSync } from 'fs-extra'

async function setup() {
  try {
    await emptyDirSync('./public')
    copySync('./src/index.html', './public/index.html')
    copySync('./lib', './public/lib')
    copySync('./index.mjs', './public/router.mjs')
  }
  catch(error) {
    console.error(error)
  }
}

setup()