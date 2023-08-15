import { browser } from '@wdio/globals'

export default class Page {

    public open (path: string = 'cd-de') {
        return browser.url(`https://demo.clickdoc.de/${path}`)
    }    
}

