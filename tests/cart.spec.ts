import { test, expect } from '../fixtures/pomFixture.js'
import products from '../testData/products.json' with { type: 'json' }

const { productList, deleteList } = products

// same user cart for all tests
test.describe.configure({ mode: 'serial' })

for (const { productName } of productList) {
    test(`Add ${productName} to cart`, async ({ homePage, productPage, cartPage }) => {
        await homePage.goto()
        await homePage.openProduct(productName)
        await productPage.addToCart()

        await cartPage.goto()
        await expect(cartPage.productRows(productName).first()).toBeVisible()
    })
}

for (const { productName } of deleteList) {
    test(`Delete ${productName} from cart`, async ({ homePage, productPage, cartPage }) => {
        // add it first so this test can run on its own
        await homePage.goto()
        await homePage.openProduct(productName)
        await productPage.addToCart()

        await cartPage.goto()
        const rows = cartPage.productRows(productName)
        await expect(rows.first()).toBeVisible()
        const countBefore = await rows.count()

        await cartPage.deleteProduct(productName)
        await expect(rows).toHaveCount(countBefore - 1)
    })
}