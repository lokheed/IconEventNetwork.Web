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

### Graph
```mermaid
graph TD;
  app-profile-name --> icn-profile-actions
  page-profile-person --> app-profile-name
  page-profile-person-at-company --> app-profile-name
  style app-profile-name fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
