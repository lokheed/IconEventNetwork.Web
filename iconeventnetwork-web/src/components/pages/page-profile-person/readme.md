# page-profile-person



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [app-root](../../app-root)

### Depends on

- [app-profile-left-nav](../../app-profile-left-nav)
- [app-profile-name-item](../../app-profile-name-item)
- [app-profile-email-address-item](../../app-profile-email-address-item)
- [app-profile-phone-number-item](../../app-profile-phone-number-item)
- [app-profile-address-item](../../app-profile-address-item)
- [app-responsive-image](../../app-responsive-image)

### Graph
```mermaid
graph TD;
  page-profile-person --> app-profile-left-nav
  page-profile-person --> app-profile-name-item
  page-profile-person --> app-profile-email-address-item
  page-profile-person --> app-profile-phone-number-item
  page-profile-person --> app-profile-address-item
  page-profile-person --> app-responsive-image
  app-profile-name-item --> app-modal
  app-profile-email-address-item --> app-modal
  app-profile-email-address-item --> app-confirmation
  app-profile-phone-number-item --> app-modal
  app-profile-phone-number-item --> app-confirmation
  app-profile-address-item --> app-modal
  app-profile-address-item --> app-confirmation
  app-root --> page-profile-person
  style page-profile-person fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
