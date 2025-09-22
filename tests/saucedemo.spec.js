const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const ProductsPage = require('./pages/ProductsPage');
const CartPage = require('./pages/CartPage');
const CheckoutPage = require('./pages/CheckoutPage');
const testData = require('./data/testData');

test('Complete checkout flow test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Open website and login
    await loginPage.navigate();
    await loginPage.login(testData.loginCredentials.username, testData.loginCredentials.password);

    // Step 2: Add Sauce Labs Backpack to cart
    await productsPage.addBackpackToCart();

    // Step 3: Open cart
    await productsPage.openCart();

    // Step 4: Proceed to checkout
    await cartPage.clickCheckout();

    // Step 5: Fill checkout information
    await checkoutPage.fillCheckoutInfo(
        testData.checkoutInfo.firstName,
        testData.checkoutInfo.lastName,
        testData.checkoutInfo.zipCode
    );

    // Step 6: Continue and finish checkout
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    // Step 7: Verify thank you message
    const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
    expect(confirmationMessage).toBe('Thank you for your order!');
});