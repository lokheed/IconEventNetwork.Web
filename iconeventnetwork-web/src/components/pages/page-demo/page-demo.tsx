import { Component, Prop, State, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-demo',
  styleUrl: 'page-demo.css',
  shadow: true,
})
export class PageDemo {
  @Prop() history: RouterHistory;
  @Prop() prefixesOptions: HTMLElement;
  @Prop() suffixesOptions: HTMLElement;
  @Prop() pronounOptions: HTMLElement;
  @Prop() personAddressTypeOptions: HTMLElement;
  @Prop() personCompanyAddressTypeOptions: HTMLElement;
  @Prop() companyAddressTypeOptions: HTMLElement;
  @Prop() personPhoneNumberTypeOptions: HTMLElement;
  @Prop() personCompanyPhoneNumberTypeOptions: HTMLElement;
  @Prop() companyPhoneNumberTypeOptions: HTMLElement;
  @Prop() personEmailAddressTypeOptions: HTMLElement;
  @Prop() personCompanyEmailAddressTypeOptions: HTMLElement;
  @Prop() companyEmailAddressTypeOptions: HTMLElement;
  @Prop() personSocialMediaTypeOptions: HTMLElement;
  @Prop() personCompanySocialMediaTypeOptions: HTMLElement;
  @Prop() companySocialMediaTypeOptions: HTMLElement;
  @Prop() countryOptions: HTMLElement;
  @State() selectedCountry: string;
  @State() countrySubvivisionOptions: HTMLElement;
  @State() selectedCountrySubdivision: string;

  handleCountryChange(event) {
    this.selectedCountry = event.target.value;
    this.selectedCountrySubdivision = '';
    this.getCountrySubdivisionOptions();
  }

  handleCountrySubdivisionChange(event) { 
    this.selectedCountrySubdivision = event.target.value;
  }

  componentWillLoad() {
    this.getPrefixesOptions();
    this.getSuffixesOptions();
    this.getPronounOptions();
    this.getPersonAddressTypeOptions();
    this.getPersonCompanyAddressTypeOptions();
    this.getCompanyAddressTypeOptions();
    this.getPersonPhoneNumberTypeOptions();
    this.getPersonCompanyPhoneNumberTypeOptions();
    this.getCompanyPhoneNumberTypeOptions();
    this.getPersonEmailAddressTypeOptions();
    this.getPersonCompanyEmailAddressTypeOptions();
    this.getCompanyEmailAddressTypeOptions();
    this.getPersonSocialMediaTypeOptions();
    this.getPersonCompanySocialMediaTypeOptions();
    this.getCompanySocialMediaTypeOptions();   
    this.getCountryOptions();
  }

  componentWillRender() {
    var isAuthenticated = !!localStorage.getItem('jwt');       
    if (!isAuthenticated) {
      this.history.replace('/', {});
    }
  } 

  updateCompanyAddressTypeOptions(companyAddressTypesData) {
    this.companyAddressTypeOptions = companyAddressTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updatePersonAddressTypeOptions(personAddressTypesData) {
    this.personAddressTypeOptions = personAddressTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }
  
  updatePersonCompanyAddressTypeOptions(personCompanyAddressTypesData) {
    this.personCompanyAddressTypeOptions = personCompanyAddressTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updateCompanyEmailAddressTypeOptions(companyEmailAddressTypesData) {
    this.companyEmailAddressTypeOptions = companyEmailAddressTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updatePersonEmailAddressTypeOptions(personEmailAddressTypesData) {
    this.personEmailAddressTypeOptions = personEmailAddressTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }
  
  updatePersonCompanyEmailAddressTypeOptions(personCompanyEmailAddressTypesData) {
    this.personCompanyEmailAddressTypeOptions = personCompanyEmailAddressTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updateCompanyPhoneNumberTypeOptions(companyPhoneNumberTypesData) {
    this.companyPhoneNumberTypeOptions = companyPhoneNumberTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updatePersonPhoneNumberTypeOptions(personPhoneNumberTypesData) {
    this.personPhoneNumberTypeOptions = personPhoneNumberTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }
  
  updatePersonCompanyPhoneNumberTypeOptions(personCompanyPhoneNumberTypesData) {
    this.personCompanyPhoneNumberTypeOptions = personCompanyPhoneNumberTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updateCompanySocialMediaTypeOptions(companySocialMediaTypesData) {
    this.companySocialMediaTypeOptions = companySocialMediaTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updatePersonSocialMediaTypeOptions(personSocialMediaTypesData) {
    this.personSocialMediaTypeOptions = personSocialMediaTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }
  
  updatePersonCompanySocialMediaTypeOptions(personCompanySocialMediaTypesData) {
    this.personCompanySocialMediaTypeOptions = personCompanySocialMediaTypesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }


  updatePrefixesOptions(prefixesData) {
    this.prefixesOptions = prefixesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updatePronounOptions(pronounsData) {
    this.pronounOptions = pronounsData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }

  updateSuffixesOptions(suffixesData) {
    this.suffixesOptions = suffixesData.map((d) => <option value={d.id}>{d.attributes.Name}</option>);;
  }
  
  updateCountryOptions(countryData) {
    this.countryOptions = countryData.map((d) => <option value={d.attributes.A2} selected={this.selectedCountry == d.attributes.A2}>{d.attributes.Name}</option>);
  }

  updateCountrySubdivisionOptions(countrySubdivisionData) {
    this.countrySubvivisionOptions = countrySubdivisionData.map((d) => <option value={d.attributes.Code} selected={this.selectedCountrySubdivision == d.attributes.Code}>{d.attributes.Name}</option>);;
  }

  private getOptions() {
    return {  
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
    }
  }

  private getCompanyAddressTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/address-types?filters[IsActive][$eq]=1&filters[AppliesToCompany][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updateCompanyAddressTypeOptions(res.data);
    });
  }

  private getPersonAddressTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/address-types?filters[IsActive][$eq]=1&filters[AppliesToPerson][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePersonAddressTypeOptions(res.data);
    });
  }

  private getPersonCompanyAddressTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/address-types?filters[IsActive][$eq]=1&filters[AppliesToPersonCompany][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePersonCompanyAddressTypeOptions(res.data);
    });
  }

  private getCompanyEmailAddressTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/email-address-types?filters[IsActive][$eq]=1&filters[AppliesToCompany][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updateCompanyEmailAddressTypeOptions(res.data);
    });
  }

  private getPersonEmailAddressTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/email-address-types?filters[IsActive][$eq]=1&filters[AppliesToPerson][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePersonEmailAddressTypeOptions(res.data);
    });
  }

  private getPersonCompanyEmailAddressTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/email-address-types?filters[IsActive][$eq]=1&filters[AppliesToPersonCompany][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePersonCompanyEmailAddressTypeOptions(res.data);
    });
  }

  private getCompanyPhoneNumberTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/phone-number-types?filters[IsActive][$eq]=1&filters[AppliesToCompany][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updateCompanyPhoneNumberTypeOptions(res.data);
    });
  }

  private getPersonPhoneNumberTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/phone-number-types?filters[IsActive][$eq]=1&filters[AppliesToPerson][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePersonPhoneNumberTypeOptions(res.data);
    });
  }

  private getPersonCompanyPhoneNumberTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/phone-number-types?filters[IsActive][$eq]=1&filters[AppliesToPersonCompany][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePersonCompanyPhoneNumberTypeOptions(res.data);
    });
  }

  private getCompanySocialMediaTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/social-media-types?filters[IsActive][$eq]=1&filters[AppliesToCompany][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updateCompanySocialMediaTypeOptions(res.data);
    });
  }

  private getPersonSocialMediaTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/social-media-types?filters[IsActive][$eq]=1&filters[AppliesToPerson][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePersonSocialMediaTypeOptions(res.data);
    });
  }

  private getPersonCompanySocialMediaTypeOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/social-media-types?filters[IsActive][$eq]=1&filters[AppliesToPersonCompany][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePersonCompanySocialMediaTypeOptions(res.data);
    });
  }

  private getPrefixesOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/prefixes?filters[IsActive][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePrefixesOptions(res.data);
    });
  }

  private getPronounOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/pronouns?filters[IsActive][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updatePronounOptions(res.data);
    });
  }

  private getSuffixesOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/suffixes?filters[IsActive][$eq]=1&sort=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updateSuffixesOptions(res.data);
    });
  }

  private getCountryOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/countries?filters[IsActive][$eq]=1&pagination[pageSize]=300&sort=SearchableName`, options)
    .then(res => res.json())
    .then(res => {
      this.updateCountryOptions(res.data);
    });
  }

  private getCountrySubdivisionOptions() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/countrysubdivisions?filters[Code][$startsWith]=${this.selectedCountry}&filters[IsActive][$eq]=1&pagination[pageSize]=100&sort=SearchableName`, options)
    .then(res => res.json())
    .then(res => {
      this.updateCountrySubdivisionOptions(res.data);
    });
  }

  private getStrapiBaseUrl() {
    var strapiBaseUrl = 'https://api.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
    if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';
    return strapiBaseUrl;
  }

  render() {
    return (
      <div class="page-demo">
        <h1>Demo</h1>
        <h2>Country and State/Region</h2>
        <select onInput={(event) => this.handleCountryChange(event)}><option value='' selected={this.selectedCountry == ''}></option>{this.countryOptions}</select>
        <br/>
        <select onInput={(event) => this.handleCountrySubdivisionChange(event)}><option value='' selected={this.selectedCountrySubdivision == ''}></option>{this.countrySubvivisionOptions}</select>
        <br/>
        Selected Country ISO A2 Code: {this.selectedCountry}
        <br/>
        Selected State/Region ISO Code: {this.selectedCountrySubdivision}
        <h2>Prefix</h2>
        <select><option></option>{this.prefixesOptions}</select>
        <h2>Suffix</h2>
        <select><option></option>{this.suffixesOptions}</select>
        <h2>Pronouns</h2>
        <select><option></option>{this.pronounOptions}</select>
        <h2>Address Types: Person</h2>
        <select><option></option>{this.personAddressTypeOptions}</select>
        <h2>Address Types: Person at Company</h2>
        <select><option></option>{this.personCompanyAddressTypeOptions}</select>
        <h2>Address Types: Company</h2>
        <select><option></option>{this.companyAddressTypeOptions}</select>
        <h2>Phone Number Types: Person</h2>
        <select><option></option>{this.personPhoneNumberTypeOptions}</select>
        <h2>Phone Number Types: Person at Company</h2>
        <select><option></option>{this.personCompanyPhoneNumberTypeOptions}</select>
        <h2>Phone Number Types: Company</h2>
        <select><option></option>{this.companyPhoneNumberTypeOptions}</select>
        <h2>Email Address Types: Person</h2>
        <select><option></option>{this.personEmailAddressTypeOptions}</select>
        <h2>Email Address Types: Person at Company</h2>
        <select><option></option>{this.personCompanyEmailAddressTypeOptions}</select>
        <h2>Email Address Types: Company</h2>
        <select><option></option>{this.companyEmailAddressTypeOptions}</select>
        <h2>Social Media Types: Person</h2>
        <select><option></option>{this.personSocialMediaTypeOptions}</select>
        <h2>Social Media Types: Person at Company</h2>
        <select><option></option>{this.personCompanySocialMediaTypeOptions}</select>
        <h2>Social Media Types: Company</h2>
        <select><option></option>{this.companySocialMediaTypeOptions}</select>
      </div>
    );
  }

}
