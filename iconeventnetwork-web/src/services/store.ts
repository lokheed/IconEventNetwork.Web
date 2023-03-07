import { createStore } from "@stencil/store";
const { state } = createStore({
    personAddressTypes: [],
    personAtCompanyAddressTypes: [],
    companyAddressTypes: [],
    personEmailAddressTypes: [],
    personAtCompanyEmailAddressTypes: [],
    companyEmailAddressTypes: [],
    personPhoneNumberTypes: [],
    personAtCompanyPhoneNumberTypes: [],
    companyPhoneNumberTypes: [],
    countries: [],
    prefixes: [],
    suffixes: [],
    pronouns: [],
    languages: [],
});

export default state;