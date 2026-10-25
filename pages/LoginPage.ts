import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly loginLink: Locator
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly welcomeUser: Locator

    constructor(page: Page) {
        this.page = page
        this.loginLink = page.locator('#login2')
        this.usernameInput = page.locator('#loginusername')
        this.passwordInput = page.locator('#loginpassword')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
        this.welcomeUser = page.locator('#nameofuser')
    }

    async goto() {
        await this.page.goto('/')
    }

    async login(username: string, password: string) {
        await this.loginLink.click()
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
        await expect(this.welcomeUser).toHaveText('Welcome ' + username)
    }
}
