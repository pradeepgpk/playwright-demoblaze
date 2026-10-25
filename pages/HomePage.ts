import type { Page } from '@playwright/test'

export class HomePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('/')
    }

    async openProduct(productName: string) {
        await this.page.getByRole('link', { name: productName }).click()
    }
}


