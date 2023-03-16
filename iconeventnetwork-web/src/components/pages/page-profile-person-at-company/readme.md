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
- [app-profile-name-item](../../app-profile-name-item)
- [app-profile-job-title](../../app-profile-job-title)
- [app-profile-biography](../../app-profile-biography)
- [app-profile-email-address-item](../../app-profile-email-address-item)
- [app-profile-phone-number-item](../../app-profile-phone-number-item)
- [app-profile-address-item](../../app-profile-address-item)
- [app-responsive-image](../../app-responsive-image)

### Graph
```mermaid
graph TD;
  page-profile-person-at-company --> app-profile-left-nav
  page-profile-person-at-company --> app-profile-name-item
  page-profile-person-at-company --> app-profile-job-title
  page-profile-person-at-company --> app-profile-biography
  page-profile-person-at-company --> app-profile-email-address-item
  page-profile-person-at-company --> app-profile-phone-number-item
  page-profile-person-at-company --> app-profile-address-item
  page-profile-person-at-company --> app-responsive-image
  app-profile-biography --> icn-rich-text-editor
  app-profile-email-address-item --> app-confirmation
  app-profile-phone-number-item --> app-confirmation
  app-profile-address-item --> app-confirmation
  app-root --> page-profile-person-at-company
  style page-profile-person-at-company fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
