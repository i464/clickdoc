import MainPage from '../pageobjects/main.page';
import { URLS, SEARCH_PARAMS, EXPECTED_VALUES } from '../pageobjects/constants';

describe('СlickDock tests', () => {
    
    beforeEach(async () => {
        await MainPage.open();
        await MainPage.closeCookiePopup();
        await MainPage.enterSearch(SEARCH_PARAMS.NAME, SEARCH_PARAMS.LOCATION);
        await MainPage.clickSearchButton();

        await browser.waitUntil(async () => {
            const currentUrl = await MainPage.getCurrentUrl();
            return currentUrl === URLS.SEARCH;
        }, {
            timeout: 10000,
            timeoutMsg: 'Expected URL to change to SEARCH after 10s'
        });
    });

    it('should find the doctor', async () => {
        const currentUrl = await MainPage.getCurrentUrl();
        expect(currentUrl).toEqual(URLS.SEARCH);
        
        const actualName = await MainPage.getDoctorNameFromSearchResults();
        const actualAddress = await MainPage.getDoctorAddressFromSearchResults();
        
        expect(actualName).toEqual(EXPECTED_VALUES.NAME);
        expect(actualAddress).toEqual(EXPECTED_VALUES.ADDRESS);
    });

    it('should verify doctor details and schedule', async () => {
        await MainPage.clickDoctorLink();

        await browser.waitUntil(async () => {
            const currentUrl = await MainPage.getCurrentUrl();
            return currentUrl === URLS.DOCTOR_DETAILS;
        }, {
            timeout: 10000,
            timeoutMsg: 'Expected URL to change to DOCTOR_DETAILS after 10s'
        });
        
        const doctorDetails = await MainPage.getDoctorDetails();
        
        expect(doctorDetails.name).toEqual(EXPECTED_VALUES.NAME);
        expect(doctorDetails.address).toEqual(EXPECTED_VALUES.ADDRESS);
        
        const currentDate = new Date();
        const currentDay = EXPECTED_VALUES.DAYS[currentDate.getDay()];
        const highlightedDay = await MainPage.getHighlightedDay();
        
        expect(highlightedDay).toEqual(currentDay);
    });
});