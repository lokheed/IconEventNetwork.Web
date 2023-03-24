# app-profile-picture



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute  | Description | Type                       | Default     |
| ------------ | ---------- | ----------- | -------------------------- | ----------- |
| `canEdit`    | `can-edit` |             | `boolean`                  | `undefined` |
| `personItem` | --         |             | `DataResponse<PersonInfo>` | `undefined` |


## Dependencies

### Used by

 - [page-profile-person](../pages/page-profile-person)
 - [page-profile-person-at-company](../pages/page-profile-person-at-company)

### Depends on

- [icn-profile-actions](../icn-profile-actions)
- [icn-message](../icn-message)
- [icn-button](../icn-button)
- [app-confirmation](../app-confirmation)
- [app-responsive-image](../app-responsive-image)

### Graph
```mermaid
graph TD;
  app-profile-picture --> icn-profile-actions
  app-profile-picture --> icn-message
  app-profile-picture --> icn-button
  app-profile-picture --> app-confirmation
  app-profile-picture --> app-responsive-image
  app-confirmation --> icn-button
  page-profile-person --> app-profile-picture
  page-profile-person-at-company --> app-profile-picture
  style app-profile-picture fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
