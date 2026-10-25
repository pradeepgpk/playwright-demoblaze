import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import { HomePage } from '../pages/HomePage.js'
import { ProductPage } from '../pages/ProductPage.js'
import { CartPage } from '../pages/CartPage.js'

type PomFixtures = {
    loginPage: LoginPage
    homePage: HomePage
    productPage: ProductPage
    cartPage: CartPage
}

export const test = base.extend<PomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },
})

export { expect } from '@playwright/test'
