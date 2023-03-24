# app-profile-languages-spoken



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute   | Description | Type                                 | Default     |
| ----------------- | ----------- | ----------- | ------------------------------------ | ----------- |
| `canEdit`         | `can-edit`  |             | `boolean`                            | `undefined` |
| `languagesSpoken` | --          |             | `DataResponse<LanguageAttributes>[]` | `undefined` |
| `personId`        | `person-id` |             | `number`                             | `undefined` |


## Dependencies

### Used by

 - [page-profile-person](../pages/page-profile-person)

### Depends on

- [icn-profile-actions](../icn-profile-actions)
- [icn-button](../icn-button)

### Graph
```mermaid
graph TD;
  app-profile-languages-spoken --> icn-profile-actions
  app-profile-languages-spoken --> icn-button
  page-profile-person --> app-profile-languages-spoken
  style app-profile-languages-spoken fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
