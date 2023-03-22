# app-profile-company-logo



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type        | Default     |
| ----------- | ------------ | ----------- | ----------- | ----------- |
| `canEdit`   | `can-edit`   |             | `boolean`   | `undefined` |
| `companyId` | `company-id` |             | `number`    | `undefined` |
| `logo`      | --           |             | `ImageInfo` | `undefined` |


## Dependencies

### Used by

 - [page-profile-company](../pages/page-profile-company)

### Depends on

- [app-responsive-image](../app-responsive-image)
- [icn-profile-actions](../icn-profile-actions)
- [icn-message](../icn-message)
- [app-confirmation](../app-confirmation)

### Graph
```mermaid
graph TD;
  app-profile-company-logo --> app-responsive-image
  app-profile-company-logo --> icn-profile-actions
  app-profile-company-logo --> icn-message
  app-profile-company-logo --> app-confirmation
  page-profile-company --> app-profile-company-logo
  style app-profile-company-logo fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
