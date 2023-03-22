# app-root



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [app-header](../app-header)
- [page-login-redirect](../pages/page-login-redirect)
- [page-code-of-conduct](../pages/page-code-of-conduct)
- [page-terms-of-service](../pages/page-terms-of-service)
- [page-privacy-policy](../pages/page-privacy-policy)
- [page-cookie-policy](../pages/page-cookie-policy)
- [page-login](../pages/page-login)
- [page-logout](../pages/page-logout)
- [page-prelaunch](../pages/page-prelaunch)
- [page-home](../pages/page-home)
- [page-event-planners](../pages/page-event-planners)
- [page-about-us](../pages/page-about-us)
- [page-dashboard](../pages/page-dashboard)
- [page-directory](../pages/page-directory)
- [page-destinations](../pages/page-destinations)
- [page-join](../pages/page-join)
- [page-profile-person](../pages/page-profile-person)
- [page-profile-person-at-companies](../pages/page-profile-person-at-companies)
- [page-profile-person-at-company](../pages/page-profile-person-at-company)
- [page-profile-company](../pages/page-profile-company)
- [page-ux-test](../pages/page-ux-test)
- [page-access-denied](../pages/page-access-denied)
- [page-not-found](../pages/page-not-found)
- [app-footer](../app-footer)

### Graph
```mermaid
graph TD;
  app-root --> app-header
  app-root --> page-login-redirect
  app-root --> page-code-of-conduct
  app-root --> page-terms-of-service
  app-root --> page-privacy-policy
  app-root --> page-cookie-policy
  app-root --> page-login
  app-root --> page-logout
  app-root --> page-prelaunch
  app-root --> page-home
  app-root --> page-event-planners
  app-root --> page-about-us
  app-root --> page-dashboard
  app-root --> page-directory
  app-root --> page-destinations
  app-root --> page-join
  app-root --> page-profile-person
  app-root --> page-profile-person-at-companies
  app-root --> page-profile-person-at-company
  app-root --> page-profile-company
  app-root --> page-ux-test
  app-root --> page-access-denied
  app-root --> page-not-found
  app-root --> app-footer
  app-header --> app-environment-nag
  app-header --> app-navigation
  app-header --> app-login-button
  app-login-button --> app-nav-user-info
  app-nav-user-info --> app-responsive-image
  page-event-planners --> app-event-planner-bio-item
  page-event-planners --> app-event-planner-item
  app-event-planner-item --> app-responsive-image
  page-about-us --> app-leadership-team-item
  page-about-us --> app-testimonial-carousel
  page-profile-person --> app-profile-left-nav
  page-profile-person --> app-profile-picture
  page-profile-person --> app-profile-name
  page-profile-person --> icn-profile-actions
  page-profile-person --> app-profile-preferred-language
  page-profile-person --> app-profile-languages-spoken
  page-profile-person --> app-profile-email-address-item
  page-profile-person --> app-profile-phone-number-item
  page-profile-person --> app-profile-address-item
  app-profile-picture --> icn-profile-actions
  app-profile-picture --> icn-message
  app-profile-picture --> app-confirmation
  app-profile-picture --> app-responsive-image
  app-profile-name --> icn-profile-actions
  app-profile-name --> icn-message
  app-profile-preferred-language --> icn-profile-actions
  app-profile-languages-spoken --> icn-profile-actions
  app-profile-email-address-item --> icn-profile-actions
  app-profile-email-address-item --> icn-message
  app-profile-email-address-item --> app-confirmation
  app-profile-phone-number-item --> icn-message
  app-profile-phone-number-item --> icn-profile-actions
  app-profile-phone-number-item --> app-confirmation
  app-profile-address-item --> icn-profile-actions
  app-profile-address-item --> app-confirmation
  page-profile-person-at-companies --> app-profile-left-nav
  page-profile-person-at-companies --> app-responsive-image
  page-profile-person-at-company --> app-profile-left-nav
  page-profile-person-at-company --> app-profile-picture
  page-profile-person-at-company --> app-profile-name
  page-profile-person-at-company --> app-profile-job-title
  page-profile-person-at-company --> app-profile-biography
  page-profile-person-at-company --> app-profile-email-address-item
  page-profile-person-at-company --> app-profile-phone-number-item
  page-profile-person-at-company --> app-profile-address-item
  app-profile-job-title --> icn-profile-actions
  app-profile-biography --> icn-profile-actions
  app-profile-biography --> icn-rich-text-editor
  page-profile-company --> app-profile-left-nav
  page-profile-company --> app-profile-company-logo
  page-profile-company --> icn-profile-actions
  page-profile-company --> app-profile-company-tagline
  page-profile-company --> app-profile-company-description
  page-profile-company --> app-profile-company-website
  page-profile-company --> app-profile-email-address-item
  page-profile-company --> app-profile-phone-number-item
  page-profile-company --> app-profile-address-item
  page-profile-company --> app-profile-social-media-item
  app-profile-company-logo --> app-responsive-image
  app-profile-company-logo --> icn-profile-actions
  app-profile-company-logo --> icn-message
  app-profile-company-logo --> app-confirmation
  app-profile-company-tagline --> icn-profile-actions
  app-profile-company-description --> icn-profile-actions
  app-profile-company-description --> icn-rich-text-editor
  app-profile-company-website --> icn-profile-actions
  app-profile-company-website --> icn-message
  app-profile-social-media-item --> icn-profile-actions
  app-profile-social-media-item --> icn-message
  app-profile-social-media-item --> app-confirmation
  app-footer --> app-footer-navigation
  style app-root fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
