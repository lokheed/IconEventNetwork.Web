# page-profile-person



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [app-root](../../app-root)

### Depends on

- [app-profile-left-nav](../../app-profile-left-nav)
- [app-profile-picture](../../app-profile-picture)
- [app-profile-name](../../app-profile-name)
- [icn-profile-actions](../../icn-profile-actions)
- [app-profile-preferred-language](../../app-profile-preferred-language)
- [app-profile-languages-spoken](../../app-profile-languages-spoken)
- [app-profile-email-address-item](../../app-profile-email-address-item)
- [app-profile-phone-number-item](../../app-profile-phone-number-item)
- [app-profile-address-item](../../app-profile-address-item)

### Graph
```mermaid
graph TD;
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
  app-root --> page-profile-person
  style page-profile-person fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
