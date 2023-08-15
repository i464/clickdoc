export const URLS = {
    SEARCH: 'https://demo.clickdoc.de/cd-de/search?q=Peter%20Test&l=Neuwied',
    DOCTOR_DETAILS: 'https://demo.clickdoc.de/cd-de/arzt/Neuwied/-/Dr-Peter-Test/0bd0d513-cc57-4c67-b082-d973a27a1ed4'
};

export const SEARCH_PARAMS = {
    NAME: 'Peter Test',
    LOCATION: 'Neuwied'
};

export const EXPECTED_VALUES = {
    NAME: 'Dr. Peter Test',
    ADDRESS: 'Blücherstraße 10, 56564 Neuwied',
    DAYS: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
};
