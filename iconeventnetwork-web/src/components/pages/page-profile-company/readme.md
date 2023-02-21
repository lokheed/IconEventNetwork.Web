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
- [app-profile-email-address-item](../../app-profile-email-address-item)

### Graph
```mermaid
graph TD;
  page-profile-company --> app-profile-left-nav
  page-profile-company --> app-responsive-image
  page-profile-company --> app-profile-email-address-item
  app-profile-email-address-item --> app-modal
  app-root --> page-profile-company
  style page-profile-company fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
