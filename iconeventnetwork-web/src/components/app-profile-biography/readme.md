# app-profile-biography



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute  | Description | Type                  | Default     |
| ----------------- | ---------- | ----------- | --------------------- | ----------- |
| `canEdit`         | `can-edit` |             | `boolean`             | `undefined` |
| `personAtCompany` | --         |             | `PersonAtCompanyData` | `undefined` |


## Dependencies

### Used by

 - [page-profile-person-at-company](../pages/page-profile-person-at-company)

### Depends on

- [icn-profile-actions](../icn-profile-actions)
- [icn-rich-text-editor](../icn-rich-text-editor)

### Graph
```mermaid
graph TD;
  app-profile-biography --> icn-profile-actions
  app-profile-biography --> icn-rich-text-editor
  page-profile-person-at-company --> app-profile-biography
  style app-profile-biography fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
