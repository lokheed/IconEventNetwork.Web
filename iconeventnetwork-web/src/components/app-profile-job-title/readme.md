# app-profile-job-title



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
- [icn-button](../icn-button)

### Graph
```mermaid
graph TD;
  app-profile-job-title --> icn-profile-actions
  app-profile-job-title --> icn-button
  icn-button --> icn-modal
  icn-button --> icn-button
  page-profile-person-at-company --> app-profile-job-title
  style app-profile-job-title fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
