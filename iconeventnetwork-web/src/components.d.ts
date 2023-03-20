/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AddressAttributes, CompanyData, DataResponse, EmailAddressAttributes, ImageInfo, LanguageAttributes, MenuLink, PersonAtCompanyData, PersonInfo, PhoneNumberAttributes, SocialMediaAttributes } from "./services/clients/client-base";
import { GetFoundingPlannersResponse } from "./services/clients/founding-planner-client";
import { GetLeadershipTeamMembersResponse } from "./services/clients/leadership-team-member-client";
import { GetRequestingPersonResponse } from "./services/clients/person-client";
export { AddressAttributes, CompanyData, DataResponse, EmailAddressAttributes, ImageInfo, LanguageAttributes, MenuLink, PersonAtCompanyData, PersonInfo, PhoneNumberAttributes, SocialMediaAttributes } from "./services/clients/client-base";
export { GetFoundingPlannersResponse } from "./services/clients/founding-planner-client";
export { GetLeadershipTeamMembersResponse } from "./services/clients/leadership-team-member-client";
export { GetRequestingPersonResponse } from "./services/clients/person-client";
export namespace Components {
    interface AppConfirmation {
        "primaryActionText"?: string;
        "secondaryActionText"?: string;
        "visible": boolean;
    }
    interface AppEnvironmentNag {
    }
    interface AppEventPlannerBioItem {
        /**
          * The details about the planner
         */
        "planner": DataResponse<GetFoundingPlannersResponse>;
    }
    interface AppEventPlannerItem {
        /**
          * The details about the planner.
         */
        "planner": DataResponse<GetFoundingPlannersResponse>;
    }
    interface AppFooter {
    }
    interface AppFooterNavigation {
        "menuItems": MenuLink[];
    }
    interface AppHeader {
        "backgroundClass": string;
    }
    interface AppLeadershipTeamItem {
        /**
          * The details about the member.
         */
        "member": DataResponse<GetLeadershipTeamMembersResponse>;
        /**
          * The color of the read more link.
         */
        "readMoreColor": string;
    }
    interface AppLoginButton {
    }
    interface AppNavUserInfo {
    }
    interface AppNavigation {
    }
    interface AppProfileAddressItem {
        "addressItem": DataResponse<AddressAttributes>;
        "appliesTo": 'person' | 'personAtCompany' | 'company';
        "canEdit": boolean;
        "companyId"?: number;
        "personAtCompanyId"?: number;
        "personId"?: number;
    }
    interface AppProfileBiography {
        "canEdit": boolean;
        "personAtCompany": PersonAtCompanyData;
    }
    interface AppProfileCompanyDescription {
        "canEdit": boolean;
        "company": CompanyData;
    }
    interface AppProfileCompanyTagline {
        "canEdit": boolean;
        "company": CompanyData;
    }
    interface AppProfileEmailAddressItem {
        "appliesTo": 'person' | 'personAtCompany' | 'company';
        "canEdit": boolean;
        "companyId"?: number;
        "emailAddressItem": DataResponse<EmailAddressAttributes>;
        "personAtCompanyId"?: number;
        "personId"?: number;
    }
    interface AppProfileJobTitle {
        "canEdit": boolean;
        "personAtCompany": PersonAtCompanyData;
    }
    interface AppProfileLanguagesSpoken {
        "canEdit": boolean;
        "languagesSpoken": DataResponse<LanguageAttributes>[];
        "personId": number;
    }
    interface AppProfileLeftNav {
        "appliesTo": 'person' | 'personAtCompany' | 'company';
        "me": GetRequestingPersonResponse;
        "selectedItemId": string;
    }
    interface AppProfileName {
        "canEdit": boolean;
        "personItem": DataResponse<PersonInfo>;
    }
    interface AppProfilePhoneNumberItem {
        "appliesTo": 'person' | 'personAtCompany' | 'company';
        "canEdit": boolean;
        "companyId"?: number;
        "personAtCompanyId"?: number;
        "personId"?: number;
        "phoneNumberItem": DataResponse<PhoneNumberAttributes>;
    }
    interface AppProfilePicture {
        "canEdit": boolean;
        "personItem": DataResponse<PersonInfo>;
    }
    interface AppProfilePreferredLanguage {
        "canEdit": boolean;
        "languageItem": DataResponse<LanguageAttributes>;
        "personId": number;
    }
    interface AppProfileSocialMediaItem {
        "canEdit": boolean;
        "companyId": number;
        "socialMediaItem": DataResponse<SocialMediaAttributes>;
    }
    interface AppResponsiveImage {
        /**
          * The css class to pass down to the rendered image.
         */
        "class": string;
        /**
          * If specified, will get only the smallest image that satisfies this width.
         */
        "expectedWidth": number;
        /**
          * The ImageInfo for this responsive image.
         */
        "image": ImageInfo;
        /**
          * The url to use if the image does not exist.
         */
        "noImageDataUrl": string;
    }
    interface AppRoot {
    }
    interface AppTestimonialCarousel {
    }
    interface IcnCopy {
        "textToCopy": string;
        "titleText"?: string;
    }
    interface IcnMessage {
        "dismissible"?: boolean;
        "hidden"?: boolean;
        "hide": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": () => Promise<void>;
        "type": 'warning' | 'success' | 'error' | 'info';
    }
    interface IcnProfileActions {
        "deleteDisabled"?: boolean;
        "deleteText"?: string;
        "editDisabled"?: boolean;
        "editText"?: string;
    }
    interface IcnRichTextEditor {
        /**
          * Gets the current html value.
         */
        "getValue": () => Promise<string>;
        /**
          * The value of the html content
         */
        "value": string;
    }
    interface PageAboutUs {
    }
    interface PageAccessDenied {
        "message": string;
    }
    interface PageCodeOfConduct {
    }
    interface PageCookiePolicy {
    }
    interface PageDashboard {
    }
    interface PageDestinations {
    }
    interface PageDirectory {
    }
    interface PageEventPlanners {
    }
    interface PageHome {
    }
    interface PageJoin {
    }
    interface PageLogin {
    }
    interface PageLoginRedirect {
    }
    interface PageLogout {
    }
    interface PageNotFound {
    }
    interface PagePrelaunch {
    }
    interface PagePrivacyPolicy {
    }
    interface PageProfileCompany {
        "companyId": string;
    }
    interface PageProfilePerson {
    }
    interface PageProfilePersonAtCompanies {
    }
    interface PageProfilePersonAtCompany {
        "personAtCompanyId": string;
    }
    interface PageTermsOfService {
    }
}
export interface AppConfirmationCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppConfirmationElement;
}
export interface AppEventPlannerBioItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppEventPlannerBioItemElement;
}
export interface AppEventPlannerItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppEventPlannerItemElement;
}
export interface AppProfileAddressItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppProfileAddressItemElement;
}
export interface AppProfileEmailAddressItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppProfileEmailAddressItemElement;
}
export interface AppProfilePhoneNumberItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppProfilePhoneNumberItemElement;
}
export interface AppProfileSocialMediaItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppProfileSocialMediaItemElement;
}
export interface IcnProfileActionsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLIcnProfileActionsElement;
}
declare global {
    interface HTMLAppConfirmationElement extends Components.AppConfirmation, HTMLStencilElement {
    }
    var HTMLAppConfirmationElement: {
        prototype: HTMLAppConfirmationElement;
        new (): HTMLAppConfirmationElement;
    };
    interface HTMLAppEnvironmentNagElement extends Components.AppEnvironmentNag, HTMLStencilElement {
    }
    var HTMLAppEnvironmentNagElement: {
        prototype: HTMLAppEnvironmentNagElement;
        new (): HTMLAppEnvironmentNagElement;
    };
    interface HTMLAppEventPlannerBioItemElement extends Components.AppEventPlannerBioItem, HTMLStencilElement {
    }
    var HTMLAppEventPlannerBioItemElement: {
        prototype: HTMLAppEventPlannerBioItemElement;
        new (): HTMLAppEventPlannerBioItemElement;
    };
    interface HTMLAppEventPlannerItemElement extends Components.AppEventPlannerItem, HTMLStencilElement {
    }
    var HTMLAppEventPlannerItemElement: {
        prototype: HTMLAppEventPlannerItemElement;
        new (): HTMLAppEventPlannerItemElement;
    };
    interface HTMLAppFooterElement extends Components.AppFooter, HTMLStencilElement {
    }
    var HTMLAppFooterElement: {
        prototype: HTMLAppFooterElement;
        new (): HTMLAppFooterElement;
    };
    interface HTMLAppFooterNavigationElement extends Components.AppFooterNavigation, HTMLStencilElement {
    }
    var HTMLAppFooterNavigationElement: {
        prototype: HTMLAppFooterNavigationElement;
        new (): HTMLAppFooterNavigationElement;
    };
    interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {
    }
    var HTMLAppHeaderElement: {
        prototype: HTMLAppHeaderElement;
        new (): HTMLAppHeaderElement;
    };
    interface HTMLAppLeadershipTeamItemElement extends Components.AppLeadershipTeamItem, HTMLStencilElement {
    }
    var HTMLAppLeadershipTeamItemElement: {
        prototype: HTMLAppLeadershipTeamItemElement;
        new (): HTMLAppLeadershipTeamItemElement;
    };
    interface HTMLAppLoginButtonElement extends Components.AppLoginButton, HTMLStencilElement {
    }
    var HTMLAppLoginButtonElement: {
        prototype: HTMLAppLoginButtonElement;
        new (): HTMLAppLoginButtonElement;
    };
    interface HTMLAppNavUserInfoElement extends Components.AppNavUserInfo, HTMLStencilElement {
    }
    var HTMLAppNavUserInfoElement: {
        prototype: HTMLAppNavUserInfoElement;
        new (): HTMLAppNavUserInfoElement;
    };
    interface HTMLAppNavigationElement extends Components.AppNavigation, HTMLStencilElement {
    }
    var HTMLAppNavigationElement: {
        prototype: HTMLAppNavigationElement;
        new (): HTMLAppNavigationElement;
    };
    interface HTMLAppProfileAddressItemElement extends Components.AppProfileAddressItem, HTMLStencilElement {
    }
    var HTMLAppProfileAddressItemElement: {
        prototype: HTMLAppProfileAddressItemElement;
        new (): HTMLAppProfileAddressItemElement;
    };
    interface HTMLAppProfileBiographyElement extends Components.AppProfileBiography, HTMLStencilElement {
    }
    var HTMLAppProfileBiographyElement: {
        prototype: HTMLAppProfileBiographyElement;
        new (): HTMLAppProfileBiographyElement;
    };
    interface HTMLAppProfileCompanyDescriptionElement extends Components.AppProfileCompanyDescription, HTMLStencilElement {
    }
    var HTMLAppProfileCompanyDescriptionElement: {
        prototype: HTMLAppProfileCompanyDescriptionElement;
        new (): HTMLAppProfileCompanyDescriptionElement;
    };
    interface HTMLAppProfileCompanyTaglineElement extends Components.AppProfileCompanyTagline, HTMLStencilElement {
    }
    var HTMLAppProfileCompanyTaglineElement: {
        prototype: HTMLAppProfileCompanyTaglineElement;
        new (): HTMLAppProfileCompanyTaglineElement;
    };
    interface HTMLAppProfileEmailAddressItemElement extends Components.AppProfileEmailAddressItem, HTMLStencilElement {
    }
    var HTMLAppProfileEmailAddressItemElement: {
        prototype: HTMLAppProfileEmailAddressItemElement;
        new (): HTMLAppProfileEmailAddressItemElement;
    };
    interface HTMLAppProfileJobTitleElement extends Components.AppProfileJobTitle, HTMLStencilElement {
    }
    var HTMLAppProfileJobTitleElement: {
        prototype: HTMLAppProfileJobTitleElement;
        new (): HTMLAppProfileJobTitleElement;
    };
    interface HTMLAppProfileLanguagesSpokenElement extends Components.AppProfileLanguagesSpoken, HTMLStencilElement {
    }
    var HTMLAppProfileLanguagesSpokenElement: {
        prototype: HTMLAppProfileLanguagesSpokenElement;
        new (): HTMLAppProfileLanguagesSpokenElement;
    };
    interface HTMLAppProfileLeftNavElement extends Components.AppProfileLeftNav, HTMLStencilElement {
    }
    var HTMLAppProfileLeftNavElement: {
        prototype: HTMLAppProfileLeftNavElement;
        new (): HTMLAppProfileLeftNavElement;
    };
    interface HTMLAppProfileNameElement extends Components.AppProfileName, HTMLStencilElement {
    }
    var HTMLAppProfileNameElement: {
        prototype: HTMLAppProfileNameElement;
        new (): HTMLAppProfileNameElement;
    };
    interface HTMLAppProfilePhoneNumberItemElement extends Components.AppProfilePhoneNumberItem, HTMLStencilElement {
    }
    var HTMLAppProfilePhoneNumberItemElement: {
        prototype: HTMLAppProfilePhoneNumberItemElement;
        new (): HTMLAppProfilePhoneNumberItemElement;
    };
    interface HTMLAppProfilePictureElement extends Components.AppProfilePicture, HTMLStencilElement {
    }
    var HTMLAppProfilePictureElement: {
        prototype: HTMLAppProfilePictureElement;
        new (): HTMLAppProfilePictureElement;
    };
    interface HTMLAppProfilePreferredLanguageElement extends Components.AppProfilePreferredLanguage, HTMLStencilElement {
    }
    var HTMLAppProfilePreferredLanguageElement: {
        prototype: HTMLAppProfilePreferredLanguageElement;
        new (): HTMLAppProfilePreferredLanguageElement;
    };
    interface HTMLAppProfileSocialMediaItemElement extends Components.AppProfileSocialMediaItem, HTMLStencilElement {
    }
    var HTMLAppProfileSocialMediaItemElement: {
        prototype: HTMLAppProfileSocialMediaItemElement;
        new (): HTMLAppProfileSocialMediaItemElement;
    };
    interface HTMLAppResponsiveImageElement extends Components.AppResponsiveImage, HTMLStencilElement {
    }
    var HTMLAppResponsiveImageElement: {
        prototype: HTMLAppResponsiveImageElement;
        new (): HTMLAppResponsiveImageElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAppTestimonialCarouselElement extends Components.AppTestimonialCarousel, HTMLStencilElement {
    }
    var HTMLAppTestimonialCarouselElement: {
        prototype: HTMLAppTestimonialCarouselElement;
        new (): HTMLAppTestimonialCarouselElement;
    };
    interface HTMLIcnCopyElement extends Components.IcnCopy, HTMLStencilElement {
    }
    var HTMLIcnCopyElement: {
        prototype: HTMLIcnCopyElement;
        new (): HTMLIcnCopyElement;
    };
    interface HTMLIcnMessageElement extends Components.IcnMessage, HTMLStencilElement {
    }
    var HTMLIcnMessageElement: {
        prototype: HTMLIcnMessageElement;
        new (): HTMLIcnMessageElement;
    };
    interface HTMLIcnProfileActionsElement extends Components.IcnProfileActions, HTMLStencilElement {
    }
    var HTMLIcnProfileActionsElement: {
        prototype: HTMLIcnProfileActionsElement;
        new (): HTMLIcnProfileActionsElement;
    };
    interface HTMLIcnRichTextEditorElement extends Components.IcnRichTextEditor, HTMLStencilElement {
    }
    var HTMLIcnRichTextEditorElement: {
        prototype: HTMLIcnRichTextEditorElement;
        new (): HTMLIcnRichTextEditorElement;
    };
    interface HTMLPageAboutUsElement extends Components.PageAboutUs, HTMLStencilElement {
    }
    var HTMLPageAboutUsElement: {
        prototype: HTMLPageAboutUsElement;
        new (): HTMLPageAboutUsElement;
    };
    interface HTMLPageAccessDeniedElement extends Components.PageAccessDenied, HTMLStencilElement {
    }
    var HTMLPageAccessDeniedElement: {
        prototype: HTMLPageAccessDeniedElement;
        new (): HTMLPageAccessDeniedElement;
    };
    interface HTMLPageCodeOfConductElement extends Components.PageCodeOfConduct, HTMLStencilElement {
    }
    var HTMLPageCodeOfConductElement: {
        prototype: HTMLPageCodeOfConductElement;
        new (): HTMLPageCodeOfConductElement;
    };
    interface HTMLPageCookiePolicyElement extends Components.PageCookiePolicy, HTMLStencilElement {
    }
    var HTMLPageCookiePolicyElement: {
        prototype: HTMLPageCookiePolicyElement;
        new (): HTMLPageCookiePolicyElement;
    };
    interface HTMLPageDashboardElement extends Components.PageDashboard, HTMLStencilElement {
    }
    var HTMLPageDashboardElement: {
        prototype: HTMLPageDashboardElement;
        new (): HTMLPageDashboardElement;
    };
    interface HTMLPageDestinationsElement extends Components.PageDestinations, HTMLStencilElement {
    }
    var HTMLPageDestinationsElement: {
        prototype: HTMLPageDestinationsElement;
        new (): HTMLPageDestinationsElement;
    };
    interface HTMLPageDirectoryElement extends Components.PageDirectory, HTMLStencilElement {
    }
    var HTMLPageDirectoryElement: {
        prototype: HTMLPageDirectoryElement;
        new (): HTMLPageDirectoryElement;
    };
    interface HTMLPageEventPlannersElement extends Components.PageEventPlanners, HTMLStencilElement {
    }
    var HTMLPageEventPlannersElement: {
        prototype: HTMLPageEventPlannersElement;
        new (): HTMLPageEventPlannersElement;
    };
    interface HTMLPageHomeElement extends Components.PageHome, HTMLStencilElement {
    }
    var HTMLPageHomeElement: {
        prototype: HTMLPageHomeElement;
        new (): HTMLPageHomeElement;
    };
    interface HTMLPageJoinElement extends Components.PageJoin, HTMLStencilElement {
    }
    var HTMLPageJoinElement: {
        prototype: HTMLPageJoinElement;
        new (): HTMLPageJoinElement;
    };
    interface HTMLPageLoginElement extends Components.PageLogin, HTMLStencilElement {
    }
    var HTMLPageLoginElement: {
        prototype: HTMLPageLoginElement;
        new (): HTMLPageLoginElement;
    };
    interface HTMLPageLoginRedirectElement extends Components.PageLoginRedirect, HTMLStencilElement {
    }
    var HTMLPageLoginRedirectElement: {
        prototype: HTMLPageLoginRedirectElement;
        new (): HTMLPageLoginRedirectElement;
    };
    interface HTMLPageLogoutElement extends Components.PageLogout, HTMLStencilElement {
    }
    var HTMLPageLogoutElement: {
        prototype: HTMLPageLogoutElement;
        new (): HTMLPageLogoutElement;
    };
    interface HTMLPageNotFoundElement extends Components.PageNotFound, HTMLStencilElement {
    }
    var HTMLPageNotFoundElement: {
        prototype: HTMLPageNotFoundElement;
        new (): HTMLPageNotFoundElement;
    };
    interface HTMLPagePrelaunchElement extends Components.PagePrelaunch, HTMLStencilElement {
    }
    var HTMLPagePrelaunchElement: {
        prototype: HTMLPagePrelaunchElement;
        new (): HTMLPagePrelaunchElement;
    };
    interface HTMLPagePrivacyPolicyElement extends Components.PagePrivacyPolicy, HTMLStencilElement {
    }
    var HTMLPagePrivacyPolicyElement: {
        prototype: HTMLPagePrivacyPolicyElement;
        new (): HTMLPagePrivacyPolicyElement;
    };
    interface HTMLPageProfileCompanyElement extends Components.PageProfileCompany, HTMLStencilElement {
    }
    var HTMLPageProfileCompanyElement: {
        prototype: HTMLPageProfileCompanyElement;
        new (): HTMLPageProfileCompanyElement;
    };
    interface HTMLPageProfilePersonElement extends Components.PageProfilePerson, HTMLStencilElement {
    }
    var HTMLPageProfilePersonElement: {
        prototype: HTMLPageProfilePersonElement;
        new (): HTMLPageProfilePersonElement;
    };
    interface HTMLPageProfilePersonAtCompaniesElement extends Components.PageProfilePersonAtCompanies, HTMLStencilElement {
    }
    var HTMLPageProfilePersonAtCompaniesElement: {
        prototype: HTMLPageProfilePersonAtCompaniesElement;
        new (): HTMLPageProfilePersonAtCompaniesElement;
    };
    interface HTMLPageProfilePersonAtCompanyElement extends Components.PageProfilePersonAtCompany, HTMLStencilElement {
    }
    var HTMLPageProfilePersonAtCompanyElement: {
        prototype: HTMLPageProfilePersonAtCompanyElement;
        new (): HTMLPageProfilePersonAtCompanyElement;
    };
    interface HTMLPageTermsOfServiceElement extends Components.PageTermsOfService, HTMLStencilElement {
    }
    var HTMLPageTermsOfServiceElement: {
        prototype: HTMLPageTermsOfServiceElement;
        new (): HTMLPageTermsOfServiceElement;
    };
    interface HTMLElementTagNameMap {
        "app-confirmation": HTMLAppConfirmationElement;
        "app-environment-nag": HTMLAppEnvironmentNagElement;
        "app-event-planner-bio-item": HTMLAppEventPlannerBioItemElement;
        "app-event-planner-item": HTMLAppEventPlannerItemElement;
        "app-footer": HTMLAppFooterElement;
        "app-footer-navigation": HTMLAppFooterNavigationElement;
        "app-header": HTMLAppHeaderElement;
        "app-leadership-team-item": HTMLAppLeadershipTeamItemElement;
        "app-login-button": HTMLAppLoginButtonElement;
        "app-nav-user-info": HTMLAppNavUserInfoElement;
        "app-navigation": HTMLAppNavigationElement;
        "app-profile-address-item": HTMLAppProfileAddressItemElement;
        "app-profile-biography": HTMLAppProfileBiographyElement;
        "app-profile-company-description": HTMLAppProfileCompanyDescriptionElement;
        "app-profile-company-tagline": HTMLAppProfileCompanyTaglineElement;
        "app-profile-email-address-item": HTMLAppProfileEmailAddressItemElement;
        "app-profile-job-title": HTMLAppProfileJobTitleElement;
        "app-profile-languages-spoken": HTMLAppProfileLanguagesSpokenElement;
        "app-profile-left-nav": HTMLAppProfileLeftNavElement;
        "app-profile-name": HTMLAppProfileNameElement;
        "app-profile-phone-number-item": HTMLAppProfilePhoneNumberItemElement;
        "app-profile-picture": HTMLAppProfilePictureElement;
        "app-profile-preferred-language": HTMLAppProfilePreferredLanguageElement;
        "app-profile-social-media-item": HTMLAppProfileSocialMediaItemElement;
        "app-responsive-image": HTMLAppResponsiveImageElement;
        "app-root": HTMLAppRootElement;
        "app-testimonial-carousel": HTMLAppTestimonialCarouselElement;
        "icn-copy": HTMLIcnCopyElement;
        "icn-message": HTMLIcnMessageElement;
        "icn-profile-actions": HTMLIcnProfileActionsElement;
        "icn-rich-text-editor": HTMLIcnRichTextEditorElement;
        "page-about-us": HTMLPageAboutUsElement;
        "page-access-denied": HTMLPageAccessDeniedElement;
        "page-code-of-conduct": HTMLPageCodeOfConductElement;
        "page-cookie-policy": HTMLPageCookiePolicyElement;
        "page-dashboard": HTMLPageDashboardElement;
        "page-destinations": HTMLPageDestinationsElement;
        "page-directory": HTMLPageDirectoryElement;
        "page-event-planners": HTMLPageEventPlannersElement;
        "page-home": HTMLPageHomeElement;
        "page-join": HTMLPageJoinElement;
        "page-login": HTMLPageLoginElement;
        "page-login-redirect": HTMLPageLoginRedirectElement;
        "page-logout": HTMLPageLogoutElement;
        "page-not-found": HTMLPageNotFoundElement;
        "page-prelaunch": HTMLPagePrelaunchElement;
        "page-privacy-policy": HTMLPagePrivacyPolicyElement;
        "page-profile-company": HTMLPageProfileCompanyElement;
        "page-profile-person": HTMLPageProfilePersonElement;
        "page-profile-person-at-companies": HTMLPageProfilePersonAtCompaniesElement;
        "page-profile-person-at-company": HTMLPageProfilePersonAtCompanyElement;
        "page-terms-of-service": HTMLPageTermsOfServiceElement;
    }
}
declare namespace LocalJSX {
    interface AppConfirmation {
        "onPrimaryConfirmationClick"?: (event: AppConfirmationCustomEvent<any>) => void;
        "onSecondaryConfirmationClick"?: (event: AppConfirmationCustomEvent<any>) => void;
        "primaryActionText"?: string;
        "secondaryActionText"?: string;
        "visible"?: boolean;
    }
    interface AppEnvironmentNag {
    }
    interface AppEventPlannerBioItem {
        "onEventPlannerItemSelected"?: (event: AppEventPlannerBioItemCustomEvent<number>) => void;
        /**
          * The details about the planner
         */
        "planner"?: DataResponse<GetFoundingPlannersResponse>;
    }
    interface AppEventPlannerItem {
        "onEventPlannerItemSelected"?: (event: AppEventPlannerItemCustomEvent<number>) => void;
        /**
          * The details about the planner.
         */
        "planner"?: DataResponse<GetFoundingPlannersResponse>;
    }
    interface AppFooter {
    }
    interface AppFooterNavigation {
        "menuItems"?: MenuLink[];
    }
    interface AppHeader {
        "backgroundClass"?: string;
    }
    interface AppLeadershipTeamItem {
        /**
          * The details about the member.
         */
        "member"?: DataResponse<GetLeadershipTeamMembersResponse>;
        /**
          * The color of the read more link.
         */
        "readMoreColor"?: string;
    }
    interface AppLoginButton {
    }
    interface AppNavUserInfo {
    }
    interface AppNavigation {
    }
    interface AppProfileAddressItem {
        "addressItem"?: DataResponse<AddressAttributes>;
        "appliesTo": 'person' | 'personAtCompany' | 'company';
        "canEdit"?: boolean;
        "companyId"?: number;
        "onAddressDeleted"?: (event: AppProfileAddressItemCustomEvent<number>) => void;
        "personAtCompanyId"?: number;
        "personId"?: number;
    }
    interface AppProfileBiography {
        "canEdit"?: boolean;
        "personAtCompany"?: PersonAtCompanyData;
    }
    interface AppProfileCompanyDescription {
        "canEdit"?: boolean;
        "company"?: CompanyData;
    }
    interface AppProfileCompanyTagline {
        "canEdit"?: boolean;
        "company"?: CompanyData;
    }
    interface AppProfileEmailAddressItem {
        "appliesTo": 'person' | 'personAtCompany' | 'company';
        "canEdit"?: boolean;
        "companyId"?: number;
        "emailAddressItem"?: DataResponse<EmailAddressAttributes>;
        "onEmailAddressDeleted"?: (event: AppProfileEmailAddressItemCustomEvent<number>) => void;
        "personAtCompanyId"?: number;
        "personId"?: number;
    }
    interface AppProfileJobTitle {
        "canEdit"?: boolean;
        "personAtCompany"?: PersonAtCompanyData;
    }
    interface AppProfileLanguagesSpoken {
        "canEdit"?: boolean;
        "languagesSpoken"?: DataResponse<LanguageAttributes>[];
        "personId"?: number;
    }
    interface AppProfileLeftNav {
        "appliesTo": 'person' | 'personAtCompany' | 'company';
        "me": GetRequestingPersonResponse;
        "selectedItemId"?: string;
    }
    interface AppProfileName {
        "canEdit"?: boolean;
        "personItem"?: DataResponse<PersonInfo>;
    }
    interface AppProfilePhoneNumberItem {
        "appliesTo": 'person' | 'personAtCompany' | 'company';
        "canEdit"?: boolean;
        "companyId"?: number;
        "onPhoneNumberDeleted"?: (event: AppProfilePhoneNumberItemCustomEvent<number>) => void;
        "personAtCompanyId"?: number;
        "personId"?: number;
        "phoneNumberItem"?: DataResponse<PhoneNumberAttributes>;
    }
    interface AppProfilePicture {
        "canEdit"?: boolean;
        "personItem"?: DataResponse<PersonInfo>;
    }
    interface AppProfilePreferredLanguage {
        "canEdit"?: boolean;
        "languageItem"?: DataResponse<LanguageAttributes>;
        "personId"?: number;
    }
    interface AppProfileSocialMediaItem {
        "canEdit"?: boolean;
        "companyId"?: number;
        "onSocialMediaDeleted"?: (event: AppProfileSocialMediaItemCustomEvent<number>) => void;
        "socialMediaItem"?: DataResponse<SocialMediaAttributes>;
    }
    interface AppResponsiveImage {
        /**
          * The css class to pass down to the rendered image.
         */
        "class"?: string;
        /**
          * If specified, will get only the smallest image that satisfies this width.
         */
        "expectedWidth"?: number;
        /**
          * The ImageInfo for this responsive image.
         */
        "image": ImageInfo;
        /**
          * The url to use if the image does not exist.
         */
        "noImageDataUrl"?: string;
    }
    interface AppRoot {
    }
    interface AppTestimonialCarousel {
    }
    interface IcnCopy {
        "textToCopy"?: string;
        "titleText"?: string;
    }
    interface IcnMessage {
        "dismissible"?: boolean;
        "hidden"?: boolean;
        "type": 'warning' | 'success' | 'error' | 'info';
    }
    interface IcnProfileActions {
        "deleteDisabled"?: boolean;
        "deleteText"?: string;
        "editDisabled"?: boolean;
        "editText"?: string;
        "onEditClick"?: (event: IcnProfileActionsCustomEvent<any>) => void;
    }
    interface IcnRichTextEditor {
        /**
          * The value of the html content
         */
        "value"?: string;
    }
    interface PageAboutUs {
    }
    interface PageAccessDenied {
        "message"?: string;
    }
    interface PageCodeOfConduct {
    }
    interface PageCookiePolicy {
    }
    interface PageDashboard {
    }
    interface PageDestinations {
    }
    interface PageDirectory {
    }
    interface PageEventPlanners {
    }
    interface PageHome {
    }
    interface PageJoin {
    }
    interface PageLogin {
    }
    interface PageLoginRedirect {
    }
    interface PageLogout {
    }
    interface PageNotFound {
    }
    interface PagePrelaunch {
    }
    interface PagePrivacyPolicy {
    }
    interface PageProfileCompany {
        "companyId"?: string;
    }
    interface PageProfilePerson {
    }
    interface PageProfilePersonAtCompanies {
    }
    interface PageProfilePersonAtCompany {
        "personAtCompanyId"?: string;
    }
    interface PageTermsOfService {
    }
    interface IntrinsicElements {
        "app-confirmation": AppConfirmation;
        "app-environment-nag": AppEnvironmentNag;
        "app-event-planner-bio-item": AppEventPlannerBioItem;
        "app-event-planner-item": AppEventPlannerItem;
        "app-footer": AppFooter;
        "app-footer-navigation": AppFooterNavigation;
        "app-header": AppHeader;
        "app-leadership-team-item": AppLeadershipTeamItem;
        "app-login-button": AppLoginButton;
        "app-nav-user-info": AppNavUserInfo;
        "app-navigation": AppNavigation;
        "app-profile-address-item": AppProfileAddressItem;
        "app-profile-biography": AppProfileBiography;
        "app-profile-company-description": AppProfileCompanyDescription;
        "app-profile-company-tagline": AppProfileCompanyTagline;
        "app-profile-email-address-item": AppProfileEmailAddressItem;
        "app-profile-job-title": AppProfileJobTitle;
        "app-profile-languages-spoken": AppProfileLanguagesSpoken;
        "app-profile-left-nav": AppProfileLeftNav;
        "app-profile-name": AppProfileName;
        "app-profile-phone-number-item": AppProfilePhoneNumberItem;
        "app-profile-picture": AppProfilePicture;
        "app-profile-preferred-language": AppProfilePreferredLanguage;
        "app-profile-social-media-item": AppProfileSocialMediaItem;
        "app-responsive-image": AppResponsiveImage;
        "app-root": AppRoot;
        "app-testimonial-carousel": AppTestimonialCarousel;
        "icn-copy": IcnCopy;
        "icn-message": IcnMessage;
        "icn-profile-actions": IcnProfileActions;
        "icn-rich-text-editor": IcnRichTextEditor;
        "page-about-us": PageAboutUs;
        "page-access-denied": PageAccessDenied;
        "page-code-of-conduct": PageCodeOfConduct;
        "page-cookie-policy": PageCookiePolicy;
        "page-dashboard": PageDashboard;
        "page-destinations": PageDestinations;
        "page-directory": PageDirectory;
        "page-event-planners": PageEventPlanners;
        "page-home": PageHome;
        "page-join": PageJoin;
        "page-login": PageLogin;
        "page-login-redirect": PageLoginRedirect;
        "page-logout": PageLogout;
        "page-not-found": PageNotFound;
        "page-prelaunch": PagePrelaunch;
        "page-privacy-policy": PagePrivacyPolicy;
        "page-profile-company": PageProfileCompany;
        "page-profile-person": PageProfilePerson;
        "page-profile-person-at-companies": PageProfilePersonAtCompanies;
        "page-profile-person-at-company": PageProfilePersonAtCompany;
        "page-terms-of-service": PageTermsOfService;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-confirmation": LocalJSX.AppConfirmation & JSXBase.HTMLAttributes<HTMLAppConfirmationElement>;
            "app-environment-nag": LocalJSX.AppEnvironmentNag & JSXBase.HTMLAttributes<HTMLAppEnvironmentNagElement>;
            "app-event-planner-bio-item": LocalJSX.AppEventPlannerBioItem & JSXBase.HTMLAttributes<HTMLAppEventPlannerBioItemElement>;
            "app-event-planner-item": LocalJSX.AppEventPlannerItem & JSXBase.HTMLAttributes<HTMLAppEventPlannerItemElement>;
            "app-footer": LocalJSX.AppFooter & JSXBase.HTMLAttributes<HTMLAppFooterElement>;
            "app-footer-navigation": LocalJSX.AppFooterNavigation & JSXBase.HTMLAttributes<HTMLAppFooterNavigationElement>;
            "app-header": LocalJSX.AppHeader & JSXBase.HTMLAttributes<HTMLAppHeaderElement>;
            "app-leadership-team-item": LocalJSX.AppLeadershipTeamItem & JSXBase.HTMLAttributes<HTMLAppLeadershipTeamItemElement>;
            "app-login-button": LocalJSX.AppLoginButton & JSXBase.HTMLAttributes<HTMLAppLoginButtonElement>;
            "app-nav-user-info": LocalJSX.AppNavUserInfo & JSXBase.HTMLAttributes<HTMLAppNavUserInfoElement>;
            "app-navigation": LocalJSX.AppNavigation & JSXBase.HTMLAttributes<HTMLAppNavigationElement>;
            "app-profile-address-item": LocalJSX.AppProfileAddressItem & JSXBase.HTMLAttributes<HTMLAppProfileAddressItemElement>;
            "app-profile-biography": LocalJSX.AppProfileBiography & JSXBase.HTMLAttributes<HTMLAppProfileBiographyElement>;
            "app-profile-company-description": LocalJSX.AppProfileCompanyDescription & JSXBase.HTMLAttributes<HTMLAppProfileCompanyDescriptionElement>;
            "app-profile-company-tagline": LocalJSX.AppProfileCompanyTagline & JSXBase.HTMLAttributes<HTMLAppProfileCompanyTaglineElement>;
            "app-profile-email-address-item": LocalJSX.AppProfileEmailAddressItem & JSXBase.HTMLAttributes<HTMLAppProfileEmailAddressItemElement>;
            "app-profile-job-title": LocalJSX.AppProfileJobTitle & JSXBase.HTMLAttributes<HTMLAppProfileJobTitleElement>;
            "app-profile-languages-spoken": LocalJSX.AppProfileLanguagesSpoken & JSXBase.HTMLAttributes<HTMLAppProfileLanguagesSpokenElement>;
            "app-profile-left-nav": LocalJSX.AppProfileLeftNav & JSXBase.HTMLAttributes<HTMLAppProfileLeftNavElement>;
            "app-profile-name": LocalJSX.AppProfileName & JSXBase.HTMLAttributes<HTMLAppProfileNameElement>;
            "app-profile-phone-number-item": LocalJSX.AppProfilePhoneNumberItem & JSXBase.HTMLAttributes<HTMLAppProfilePhoneNumberItemElement>;
            "app-profile-picture": LocalJSX.AppProfilePicture & JSXBase.HTMLAttributes<HTMLAppProfilePictureElement>;
            "app-profile-preferred-language": LocalJSX.AppProfilePreferredLanguage & JSXBase.HTMLAttributes<HTMLAppProfilePreferredLanguageElement>;
            "app-profile-social-media-item": LocalJSX.AppProfileSocialMediaItem & JSXBase.HTMLAttributes<HTMLAppProfileSocialMediaItemElement>;
            "app-responsive-image": LocalJSX.AppResponsiveImage & JSXBase.HTMLAttributes<HTMLAppResponsiveImageElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "app-testimonial-carousel": LocalJSX.AppTestimonialCarousel & JSXBase.HTMLAttributes<HTMLAppTestimonialCarouselElement>;
            "icn-copy": LocalJSX.IcnCopy & JSXBase.HTMLAttributes<HTMLIcnCopyElement>;
            "icn-message": LocalJSX.IcnMessage & JSXBase.HTMLAttributes<HTMLIcnMessageElement>;
            "icn-profile-actions": LocalJSX.IcnProfileActions & JSXBase.HTMLAttributes<HTMLIcnProfileActionsElement>;
            "icn-rich-text-editor": LocalJSX.IcnRichTextEditor & JSXBase.HTMLAttributes<HTMLIcnRichTextEditorElement>;
            "page-about-us": LocalJSX.PageAboutUs & JSXBase.HTMLAttributes<HTMLPageAboutUsElement>;
            "page-access-denied": LocalJSX.PageAccessDenied & JSXBase.HTMLAttributes<HTMLPageAccessDeniedElement>;
            "page-code-of-conduct": LocalJSX.PageCodeOfConduct & JSXBase.HTMLAttributes<HTMLPageCodeOfConductElement>;
            "page-cookie-policy": LocalJSX.PageCookiePolicy & JSXBase.HTMLAttributes<HTMLPageCookiePolicyElement>;
            "page-dashboard": LocalJSX.PageDashboard & JSXBase.HTMLAttributes<HTMLPageDashboardElement>;
            "page-destinations": LocalJSX.PageDestinations & JSXBase.HTMLAttributes<HTMLPageDestinationsElement>;
            "page-directory": LocalJSX.PageDirectory & JSXBase.HTMLAttributes<HTMLPageDirectoryElement>;
            "page-event-planners": LocalJSX.PageEventPlanners & JSXBase.HTMLAttributes<HTMLPageEventPlannersElement>;
            "page-home": LocalJSX.PageHome & JSXBase.HTMLAttributes<HTMLPageHomeElement>;
            "page-join": LocalJSX.PageJoin & JSXBase.HTMLAttributes<HTMLPageJoinElement>;
            "page-login": LocalJSX.PageLogin & JSXBase.HTMLAttributes<HTMLPageLoginElement>;
            "page-login-redirect": LocalJSX.PageLoginRedirect & JSXBase.HTMLAttributes<HTMLPageLoginRedirectElement>;
            "page-logout": LocalJSX.PageLogout & JSXBase.HTMLAttributes<HTMLPageLogoutElement>;
            "page-not-found": LocalJSX.PageNotFound & JSXBase.HTMLAttributes<HTMLPageNotFoundElement>;
            "page-prelaunch": LocalJSX.PagePrelaunch & JSXBase.HTMLAttributes<HTMLPagePrelaunchElement>;
            "page-privacy-policy": LocalJSX.PagePrivacyPolicy & JSXBase.HTMLAttributes<HTMLPagePrivacyPolicyElement>;
            "page-profile-company": LocalJSX.PageProfileCompany & JSXBase.HTMLAttributes<HTMLPageProfileCompanyElement>;
            "page-profile-person": LocalJSX.PageProfilePerson & JSXBase.HTMLAttributes<HTMLPageProfilePersonElement>;
            "page-profile-person-at-companies": LocalJSX.PageProfilePersonAtCompanies & JSXBase.HTMLAttributes<HTMLPageProfilePersonAtCompaniesElement>;
            "page-profile-person-at-company": LocalJSX.PageProfilePersonAtCompany & JSXBase.HTMLAttributes<HTMLPageProfilePersonAtCompanyElement>;
            "page-terms-of-service": LocalJSX.PageTermsOfService & JSXBase.HTMLAttributes<HTMLPageTermsOfServiceElement>;
        }
    }
}
