# page-profile-company



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type     | Default     |
| ----------- | ------------ | ----------- | -------- | ----------- |
| `companyId` | `company-id` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [app-root](../../app-root)

### Depends on

- [app-profile-left-nav](../../app-profile-left-nav)
- [app-profile-company-logo](../../app-profile-company-logo)
- [icn-profile-actions](../../icn-profile-actions)
- [app-profile-company-tagline](../../app-profile-company-tagline)
- [app-profile-company-description](../../app-profile-company-description)
- [app-profile-company-website](../../app-profile-company-website)
- [app-profile-email-address-item](../../app-profile-email-address-item)
- [app-profile-phone-number-item](../../app-profile-phone-number-item)
- [app-profile-address-item](../../app-profile-address-item)
- [app-profile-social-media-item](../../app-profile-social-media-item)

### Graph
```mermaid
graph TD;
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
  app-profile-email-address-item --> icn-profile-actions
  app-profile-email-address-item --> app-confirmation
  app-profile-phone-number-item --> icn-message
  app-profile-phone-number-item --> icn-profile-actions
  app-profile-phone-number-item --> app-confirmation
  app-profile-address-item --> icn-profile-actions
  app-profile-address-item --> app-confirmation
  app-profile-social-media-item --> icn-profile-actions
  app-profile-social-media-item --> icn-message
  app-profile-social-media-item --> app-confirmation
  app-root --> page-profile-company
  style page-profile-company fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
