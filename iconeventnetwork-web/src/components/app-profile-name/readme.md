# app-profile-name-item



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

### Graph
```mermaid
graph TD;
  app-profile-name --> icn-profile-actions
  app-profile-name --> icn-message
  app-profile-name --> icn-button
  icn-button --> icn-modal
  icn-button --> icn-button
  page-profile-person --> app-profile-name
  page-profile-person-at-company --> app-profile-name
  style app-profile-name fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
