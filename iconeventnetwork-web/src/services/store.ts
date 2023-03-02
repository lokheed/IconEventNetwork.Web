import { createStore } from "@stencil/store";
const { state } = createStore({
    personEmailAddressTypes: [],
    personAtCompanyEmailAddressTypes: [],
    companyEmailAddressTypes: [],
    personPhoneNumberTypes: [],
    personAtCompanyPhoneNumberTypes: [],
    companyPhoneNumberTypes: [],
    phoneNumberCountries: [],
});

export default state;