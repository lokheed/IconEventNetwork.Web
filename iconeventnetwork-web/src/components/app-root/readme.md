# app-root



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [app-header](../app-header)
- [page-home](../pages/page-home)
- [page-event-planners](../pages/page-event-planners)
- [page-about-us](../pages/page-about-us)
- [page-dashboard](../pages/page-dashboard)
- [page-directory](../pages/page-directory)
- [page-destinations](../pages/page-destinations)
- [page-join](../pages/page-join)
- [page-login-redirect](../pages/page-login-redirect)
- [page-code-of-conduct](../pages/page-code-of-conduct)
- [page-terms-of-service](../pages/page-terms-of-service)
- [page-privacy-policy](../pages/page-privacy-policy)
- [page-cookie-policy](../pages/page-cookie-policy)
- [page-login](../pages/page-login)
- [page-logout](../pages/page-logout)
- [page-demo](../pages/page-demo)
- [page-not-found](../pages/page-not-found)
- [app-footer](../app-footer)

### Graph
```mermaid
graph TD;
  app-root --> app-header
  app-root --> page-home
  app-root --> page-event-planners
  app-root --> page-about-us
  app-root --> page-dashboard
  app-root --> page-directory
  app-root --> page-destinations
  app-root --> page-join
  app-root --> page-login-redirect
  app-root --> page-code-of-conduct
  app-root --> page-terms-of-service
  app-root --> page-privacy-policy
  app-root --> page-cookie-policy
  app-root --> page-login
  app-root --> page-logout
  app-root --> page-demo
  app-root --> page-not-found
  app-root --> app-footer
  app-header --> app-navigation
  app-header --> app-login-button
  page-event-planners --> app-event-planner-bio-item
  page-event-planners --> app-event-planner-item
  app-event-planner-item --> app-responsive-image
  page-about-us --> app-leadership-team-item
  page-about-us --> app-testimonial-carousel
  app-footer --> app-footer-navigation
  style app-root fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*