import {browser} from '@wdio/globals'
import { $ } from '@wdio/globals'
import Page from './page';

class MainPage extends Page {

    public get cookiePopup() {
        return $('.cookie-modal-header-title');
    }

    public get acceptAllCookiesButton() {
        return $('.consent-button.agree-consent--all');
    }

    public get searchInput() {
        return $('[data-web-test="lp-search-input"]');
    }

    public get locationInput() {
        return $('[data-web-test="lp-location-input"]');
    }

    public get searchButton() {
        return $('#search-button');
    }

    public get doctorName() {
        return $('.search-result-card-section-details-name');
    }

    public get doctorAddress() {
        return $('.search-result-card-section-address');
    }

    public get availableSlots() {
        return $('.available-slots');
    }

    public get doctorPeterTestLink() {
        return $('a.search-result-card[href*="Dr-Peter-Test"]');
    }

    public get doctorNameHeader() {
        return $('.text-wrap.header__content--title');
    }

    public get addressLink() {
        return $('[data-web-test="address-link"]');
    }

    public get highlightedDayElement() {
        return $('.text-day__item--text.current-date');
    }

public async closeCookiePopup() {
        try {
            await this.acceptAllCookiesButton.waitForDisplayed({ timeout: 5000 }); 
            if (await this.acceptAllCookiesButton.isDisplayed()) {
                await this.acceptAllCookiesButton.click();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log("No cookie popup. Error:", error.message);
            } else {
                console.log("No cookie popup. Unknown error:", error);
            }
        }
    }

    public async enterSearch(searchText: string, locationText: string) {
        await this.searchInput.waitForDisplayed();
        await this.searchInput.addValue(searchText);
        await this.locationInput.waitForDisplayed();
        await this.locationInput.addValue(locationText);
    }

    public async clickSearchButton() {
        await $('body').click();
        await this.searchButton.click();
    }

    public async getCurrentUrl() {
        return await browser.getUrl();
    }

    async getDoctorNameFromSearchResults() {
        await this.doctorName.waitForDisplayed();
        return await this.doctorName.getText();
    }

    async getDoctorAddressFromSearchResults() {
        await this.doctorAddress.waitForDisplayed();
        return await this.doctorAddress.getText();
    }

    async clickDoctorLink() {
        await this.doctorPeterTestLink.waitForDisplayed();
        await this.doctorPeterTestLink.click();
    }

    async getHighlightedDay() {
        await this.highlightedDayElement.waitForDisplayed();
        return await this.highlightedDayElement.getText();
    }

    async getDoctorDetails() {
        await this.doctorNameHeader.waitForDisplayed();
        await this.addressLink.waitForDisplayed();

        const streetName = await this.addressLink.$('[data-automation="Address - Street House"]').getText();
        const postalCityCode = await this.addressLink.$('[data-automation="Address - Postal city code"]').getText();
        return {
            name: await this.doctorNameHeader.getText(),
            address: `${streetName}, ${postalCityCode}`
        };
    }
}

export default new MainPage();
