import type { Locator, Page } from '@playwright/test'

export class ProductPage {
    readonly page: Page
    readonly addToCartLink: Locator

    constructor(page: Page) {
        this.page = page
        this.addToCartLink = page.getByRole('link', { name: 'Add to cart' })
    }

    async addToCart() {
        const dialogPromise = this.page.waitForEvent('dialog')
        await this.addToCartLink.click()
        const dialog = await dialogPromise
        console.log('Alert Text....', dialog.message())
        await dialog.accept()
    }
}
