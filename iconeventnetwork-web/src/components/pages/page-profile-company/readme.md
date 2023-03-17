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
- [app-responsive-image](../../app-responsive-image)
- [app-profile-company-tagline](../../app-profile-company-tagline)
- [app-profile-company-description](../../app-profile-company-description)
- [icn-copy](../../icn-copy)
- [app-profile-email-address-item](../../app-profile-email-address-item)
- [app-profile-phone-number-item](../../app-profile-phone-number-item)
- [app-profile-address-item](../../app-profile-address-item)

### Graph
```mermaid
graph TD;
  page-profile-company --> app-profile-left-nav
  page-profile-company --> app-responsive-image
  page-profile-company --> app-profile-company-tagline
  page-profile-company --> app-profile-company-description
  page-profile-company --> icn-copy
  page-profile-company --> app-profile-email-address-item
  page-profile-company --> app-profile-phone-number-item
  page-profile-company --> app-profile-address-item
  app-profile-company-description --> icn-rich-text-editor
  app-profile-email-address-item --> app-confirmation
  app-profile-phone-number-item --> app-confirmation
  app-profile-address-item --> app-confirmation
  app-root --> page-profile-company
  style page-profile-company fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
