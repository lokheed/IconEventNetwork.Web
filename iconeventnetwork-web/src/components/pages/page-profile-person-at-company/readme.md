# page-profile-person-at-company



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute              | Description | Type     | Default     |
| ------------------- | ---------------------- | ----------- | -------- | ----------- |
| `personAtCompanyId` | `person-at-company-id` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [app-root](../../app-root)

### Depends on

- [app-profile-left-nav](../../app-profile-left-nav)
- [app-profile-picture](../../app-profile-picture)
- [app-profile-name](../../app-profile-name)
- [app-profile-job-title](../../app-profile-job-title)
- [app-profile-biography](../../app-profile-biography)
- [app-profile-email-address-item](../../app-profile-email-address-item)
- [app-profile-phone-number-item](../../app-profile-phone-number-item)
- [app-profile-address-item](../../app-profile-address-item)

### Graph
```mermaid
graph TD;
  page-profile-person-at-company --> app-profile-left-nav
  page-profile-person-at-company --> app-profile-picture
  page-profile-person-at-company --> app-profile-name
  page-profile-person-at-company --> app-profile-job-title
  page-profile-person-at-company --> app-profile-biography
  page-profile-person-at-company --> app-profile-email-address-item
  page-profile-person-at-company --> app-profile-phone-number-item
  page-profile-person-at-company --> app-profile-address-item
  app-profile-picture --> icn-profile-actions
  app-profile-picture --> icn-message
  app-profile-picture --> app-confirmation
  app-profile-picture --> app-responsive-image
  app-profile-name --> icn-profile-actions
  app-profile-job-title --> icn-profile-actions
  app-profile-biography --> icn-profile-actions
  app-profile-biography --> icn-rich-text-editor
  app-profile-email-address-item --> icn-profile-actions
  app-profile-email-address-item --> app-confirmation
  app-profile-phone-number-item --> icn-message
  app-profile-phone-number-item --> icn-profile-actions
  app-profile-phone-number-item --> app-confirmation
  app-profile-address-item --> icn-profile-actions
  app-profile-address-item --> app-confirmation
  app-root --> page-profile-person-at-company
  style page-profile-person-at-company fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
