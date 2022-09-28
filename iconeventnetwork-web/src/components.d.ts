/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RouterHistory } from "@stencil-community/router";
export namespace Components {
    interface AppHeader {
    }
    interface AppLoginButton {
    }
    interface AppNavigation {
    }
    interface AppRoot {
    }
    interface PageDashboard {
        "history": RouterHistory;
    }
    interface PageDemo {
        "companyAddressTypeOptions": HTMLElement;
        "companyEmailAddressTypeOptions": HTMLElement;
        "companyPhoneNumberTypeOptions": HTMLElement;
        "countryOptions": HTMLElement;
        "history": RouterHistory;
        "personAddressTypeOptions": HTMLElement;
        "personCompanyAddressTypeOptions": HTMLElement;
        "personCompanyEmailAddressTypeOptions": HTMLElement;
        "personCompanyPhoneNumberTypeOptions": HTMLElement;
        "personEmailAddressTypeOptions": HTMLElement;
        "personPhoneNumberTypeOptions": HTMLElement;
        "prefixesOptions": HTMLElement;
        "pronounOptions": HTMLElement;
        "suffixesOptions": HTMLElement;
    }
    interface PageDestinations {
        "history": RouterHistory;
    }
    interface PageDirectory {
        "history": RouterHistory;
    }
    interface PageHome {
    }
    interface PageJoin {
        "history": RouterHistory;
    }
    interface PageLoginRedirect {
    }
    interface PageNotFound {
    }
}
declare global {
    interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {
    }
    var HTMLAppHeaderElement: {
        prototype: HTMLAppHeaderElement;
        new (): HTMLAppHeaderElement;
    };
    interface HTMLAppLoginButtonElement extends Components.AppLoginButton, HTMLStencilElement {
    }
    var HTMLAppLoginButtonElement: {
        prototype: HTMLAppLoginButtonElement;
        new (): HTMLAppLoginButtonElement;
    };
    interface HTMLAppNavigationElement extends Components.AppNavigation, HTMLStencilElement {
    }
    var HTMLAppNavigationElement: {
        prototype: HTMLAppNavigationElement;
        new (): HTMLAppNavigationElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLPageDashboardElement extends Components.PageDashboard, HTMLStencilElement {
    }
    var HTMLPageDashboardElement: {
        prototype: HTMLPageDashboardElement;
        new (): HTMLPageDashboardElement;
    };
    interface HTMLPageDemoElement extends Components.PageDemo, HTMLStencilElement {
    }
    var HTMLPageDemoElement: {
        prototype: HTMLPageDemoElement;
        new (): HTMLPageDemoElement;
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
    interface HTMLPageLoginRedirectElement extends Components.PageLoginRedirect, HTMLStencilElement {
    }
    var HTMLPageLoginRedirectElement: {
        prototype: HTMLPageLoginRedirectElement;
        new (): HTMLPageLoginRedirectElement;
    };
    interface HTMLPageNotFoundElement extends Components.PageNotFound, HTMLStencilElement {
    }
    var HTMLPageNotFoundElement: {
        prototype: HTMLPageNotFoundElement;
        new (): HTMLPageNotFoundElement;
    };
    interface HTMLElementTagNameMap {
        "app-header": HTMLAppHeaderElement;
        "app-login-button": HTMLAppLoginButtonElement;
        "app-navigation": HTMLAppNavigationElement;
        "app-root": HTMLAppRootElement;
        "page-dashboard": HTMLPageDashboardElement;
        "page-demo": HTMLPageDemoElement;
        "page-destinations": HTMLPageDestinationsElement;
        "page-directory": HTMLPageDirectoryElement;
        "page-home": HTMLPageHomeElement;
        "page-join": HTMLPageJoinElement;
        "page-login-redirect": HTMLPageLoginRedirectElement;
        "page-not-found": HTMLPageNotFoundElement;
    }
}
declare namespace LocalJSX {
    interface AppHeader {
    }
    interface AppLoginButton {
    }
    interface AppNavigation {
    }
    interface AppRoot {
    }
    interface PageDashboard {
        "history"?: RouterHistory;
    }
    interface PageDemo {
        "companyAddressTypeOptions"?: HTMLElement;
        "companyEmailAddressTypeOptions"?: HTMLElement;
        "companyPhoneNumberTypeOptions"?: HTMLElement;
        "countryOptions"?: HTMLElement;
        "history"?: RouterHistory;
        "personAddressTypeOptions"?: HTMLElement;
        "personCompanyAddressTypeOptions"?: HTMLElement;
        "personCompanyEmailAddressTypeOptions"?: HTMLElement;
        "personCompanyPhoneNumberTypeOptions"?: HTMLElement;
        "personEmailAddressTypeOptions"?: HTMLElement;
        "personPhoneNumberTypeOptions"?: HTMLElement;
        "prefixesOptions"?: HTMLElement;
        "pronounOptions"?: HTMLElement;
        "suffixesOptions"?: HTMLElement;
    }
    interface PageDestinations {
        "history"?: RouterHistory;
    }
    interface PageDirectory {
        "history"?: RouterHistory;
    }
    interface PageHome {
    }
    interface PageJoin {
        "history"?: RouterHistory;
    }
    interface PageLoginRedirect {
    }
    interface PageNotFound {
    }
    interface IntrinsicElements {
        "app-header": AppHeader;
        "app-login-button": AppLoginButton;
        "app-navigation": AppNavigation;
        "app-root": AppRoot;
        "page-dashboard": PageDashboard;
        "page-demo": PageDemo;
        "page-destinations": PageDestinations;
        "page-directory": PageDirectory;
        "page-home": PageHome;
        "page-join": PageJoin;
        "page-login-redirect": PageLoginRedirect;
        "page-not-found": PageNotFound;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-header": LocalJSX.AppHeader & JSXBase.HTMLAttributes<HTMLAppHeaderElement>;
            "app-login-button": LocalJSX.AppLoginButton & JSXBase.HTMLAttributes<HTMLAppLoginButtonElement>;
            "app-navigation": LocalJSX.AppNavigation & JSXBase.HTMLAttributes<HTMLAppNavigationElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "page-dashboard": LocalJSX.PageDashboard & JSXBase.HTMLAttributes<HTMLPageDashboardElement>;
            "page-demo": LocalJSX.PageDemo & JSXBase.HTMLAttributes<HTMLPageDemoElement>;
            "page-destinations": LocalJSX.PageDestinations & JSXBase.HTMLAttributes<HTMLPageDestinationsElement>;
            "page-directory": LocalJSX.PageDirectory & JSXBase.HTMLAttributes<HTMLPageDirectoryElement>;
            "page-home": LocalJSX.PageHome & JSXBase.HTMLAttributes<HTMLPageHomeElement>;
            "page-join": LocalJSX.PageJoin & JSXBase.HTMLAttributes<HTMLPageJoinElement>;
            "page-login-redirect": LocalJSX.PageLoginRedirect & JSXBase.HTMLAttributes<HTMLPageLoginRedirectElement>;
            "page-not-found": LocalJSX.PageNotFound & JSXBase.HTMLAttributes<HTMLPageNotFoundElement>;
        }
    }
}
