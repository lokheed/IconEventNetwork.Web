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

- [app-modal](../app-modal)

### Graph
```mermaid
graph TD;
  app-profile-name-item --> app-modal
  page-profile-person --> app-profile-name-item
  page-profile-person-at-company --> app-profile-name-item
  style app-profile-name-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
