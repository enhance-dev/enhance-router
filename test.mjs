import keepAlive from './keepAlive.mjs'
import webdriver from 'selenium-webdriver'
const iphone13pro = {
  "os_version" : "15",
  "device" : "iPhone 13 Pro",
  "browserName" : "iPhone",
  "real_mobile" : "true",
  "browserstack.local" : "false",
  'build': process.env.BROWSERSTACK_BUILD_NAME,
  'project': process.env.BROWSERSTACK_PROJECT_NAME,
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.user': process.env.BROWSERSTACK_USERNAME,
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY
}
const chromeWindows = {
  'os': 'windows',
  'os_version': '10',
  'browserName': 'chrome',
  'browser_version' : 'latest',
  'browserstack.local': 'true',
  'build': process.env.BROWSERSTACK_BUILD_NAME,
  'project': process.env.BROWSERSTACK_PROJECT_NAME,
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.user': process.env.BROWSERSTACK_USERNAME,
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY
}
const safari15 = {
  'os' : 'OS X',
  'os_version' : 'Monterey',
  'browserName' : "Safari",
  'browser_version' : '15.0',
  'browserstack.local' : 'false',
  'build': process.env.BROWSERSTACK_BUILD_NAME,
  'project': process.env.BROWSERSTACK_PROJECT_NAME,
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.user': process.env.BROWSERSTACK_USERNAME,
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY
}
const FirefoxLatest = {
  "os" : "OS X",
  "os_version" : "Monterey",
  "browserName" : "Firefox",
  "browser_version" : "latest",
  "browserstack.local" : "false",
  'build': process.env.BROWSERSTACK_BUILD_NAME,
  'project': process.env.BROWSERSTACK_PROJECT_NAME,
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.user': process.env.BROWSERSTACK_USERNAME,
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY
}

async function test(capabilities) {
  const driver = new webdriver.Builder()
    .usingServer('http://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build()
  await driver.get('http://localhost:3333/')
  const failures = await driver.findElements(webdriver.By.css('#fail'))
  const failed = await failures[0].getText()
  if(!failed){
    driver.executeScript(
      `browserstack_executor: {
        "action": "setSessionStatus",
        "arguments": {
          "status":"passed",
          "reason": "No test failures"
        }
      }`
    )
  } else {
    driver.executeScript(
      `browserstack_executor: {
        "action": "setSessionStatus",
        "arguments": {
          "status":"failed",
          "reason": "Test failures\n${failed}"
        }
      }`
    )
  }
  await driver.quit()
}

test(chromeWindows)
//test(iphone13pro)
//test(safari15)
//test(FirefoxLatest)