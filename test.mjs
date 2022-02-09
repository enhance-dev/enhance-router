import webdriver from 'selenium-webdriver'

async function test(capabilities) {
  let driver
  try {
    driver = new webdriver.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build()
    await driver.get('http://localhost:8099')
    const failures = await driver.findElements(webdriver.By.css('#fail > h3'))
    console.log('Failures: ', failures)
    if (failures.length) {
      const failed = await failures.getText()
      console.log('text: ', failed)
      if(!failed){
        await driver.executeScript(
          `browserstack_executor: {
            "action": "setSessionStatus",
            "arguments": {
              "status":"passed",
              "reason": "No test failures"
            }
          }`
        )
      }
    } else {
      await driver.executeScript(
        `browserstack_executor: {
          "action": "setSessionStatus",
          "arguments": {
            "status":"failed",
            "reason": "Test failures\n${failed}"
          }
        }`
      )
    }
  }
  catch (error) {
    console.error(error)
    await driver.executeScript(
      `browserstack_executor: {
        "action": "setSessionStatus",
        "arguments": {
          "status":"failed",
          "reason": "Failed with error\n${error.message}"
        }
      }`
    )
  }
  finally {
    if (driver) {
      await driver.quit()
    }
  }
}

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

await test(chromeWindows)
await test(iphone13pro)
await test(safari15)
await test(FirefoxLatest)