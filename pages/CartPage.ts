import { expect, type Locator, type Page } from '@playwright/test'

export class CartPage {
    readonly page: Page
    readonly cartRows: Locator

    constructor(page: Page) {
        this.page = page
        this.cartRows = page.locator('#tbodyid tr')
    }

    async goto() {
        // wait till all rows from /viewcart are loaded
        const cartResponse = this.page.waitForResponse(res => res.url().includes('/viewcart'))
        await this.page.goto('cart.html')
        const { Items } = await (await cartResponse).json() as { Items: unknown[] }
        await expect(this.cartRows).toHaveCount(Items.length)
    }

    productRows(productName: string): Locator {
        return this.cartRows.filter({ hasText: productName })
    }

    async deleteProduct(productName: string) {
        await this.productRows(productName).first().getByRole('link', { name: 'Delete' }).click()
    }
}
