# app-profile-preferred-language-item



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute   | Description | Type                               | Default     |
| -------------- | ----------- | ----------- | ---------------------------------- | ----------- |
| `canEdit`      | `can-edit`  |             | `boolean`                          | `undefined` |
| `languageItem` | --          |             | `DataResponse<LanguageAttributes>` | `undefined` |
| `personId`     | `person-id` |             | `number`                           | `undefined` |


## Dependencies

### Used by

 - [page-profile-person](../pages/page-profile-person)

### Depends on

- [icn-profile-actions](../icn-profile-actions)
- [icn-button](../icn-button)

### Graph
```mermaid
graph TD;
  app-profile-preferred-language --> icn-profile-actions
  app-profile-preferred-language --> icn-button
  page-profile-person --> app-profile-preferred-language
  style app-profile-preferred-language fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
