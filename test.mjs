import webdriver from 'selenium-webdriver'

const capabilities = {
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

async function test() {
  const driver = new webdriver.Builder()
    .usingServer('http://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build()
  await driver.get('http://localhost:3333/')
  const failures = await driver.findElements(webdriver.By.css('#fail'))
  const failed = await failures[0].getText()
  console.log(failed)
  await driver.quit()
}

test()