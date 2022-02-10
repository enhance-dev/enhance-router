// @ts-check
import { test, expect } from '@playwright/test'

test('Look for failures', async ({ page }) => {
  await page.goto('localhost:3333')
  const fail = page.locator('#fail')
  await expect(fail).toBeEmpty()
})
