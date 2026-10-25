import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import loginData from '../testData/loginData.json' with { type: 'json' }

const authFile = 'playwright/.auth/user.json'

setup('login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(loginData.username, loginData.password)
    await page.context().storageState({ path: authFile })
})
