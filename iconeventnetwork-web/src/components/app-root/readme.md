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
  page-profile-person --> app-profile-name-item
  page-profile-person --> app-profile-email-address-item
  page-profile-person --> app-profile-phone-number-item
  page-profile-person --> app-profile-address-item
  page-profile-person --> app-responsive-image
  app-profile-email-address-item --> app-confirmation
  app-profile-phone-number-item --> app-confirmation
  app-profile-address-item --> app-confirmation
  page-profile-person-at-companies --> app-profile-left-nav
  page-profile-person-at-companies --> app-responsive-image
  page-profile-person-at-company --> app-profile-left-nav
  page-profile-person-at-company --> app-profile-name-item
  page-profile-person-at-company --> app-profile-email-address-item
  page-profile-person-at-company --> app-profile-phone-number-item
  page-profile-person-at-company --> app-profile-address-item
  page-profile-person-at-company --> app-responsive-image
  page-profile-company --> app-profile-left-nav
  page-profile-company --> app-responsive-image
  page-profile-company --> app-profile-email-address-item
  page-profile-company --> app-profile-phone-number-item
  page-profile-company --> app-profile-address-item
  app-footer --> app-footer-navigation
  style app-root fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
