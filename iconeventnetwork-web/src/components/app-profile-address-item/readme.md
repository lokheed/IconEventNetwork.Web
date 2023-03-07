# app-profile-address-item



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute              | Description | Type                                         | Default     |
| ------------------------ | ---------------------- | ----------- | -------------------------------------------- | ----------- |
| `addressItem`            | --                     |             | `DataResponse<AddressAttributes>`            | `undefined` |
| `appliesTo` _(required)_ | `applies-to`           |             | `"company" \| "person" \| "personAtCompany"` | `undefined` |
| `canEdit`                | `can-edit`             |             | `boolean`                                    | `undefined` |
| `companyId`              | `company-id`           |             | `number`                                     | `undefined` |
| `personAtCompanyId`      | `person-at-company-id` |             | `number`                                     | `undefined` |
| `personId`               | `person-id`            |             | `number`                                     | `undefined` |


## Events

| Event            | Description | Type                  |
| ---------------- | ----------- | --------------------- |
| `addressDeleted` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [page-profile-company](../pages/page-profile-company)
 - [page-profile-person](../pages/page-profile-person)
 - [page-profile-person-at-company](../pages/page-profile-person-at-company)

### Depends on

- [app-confirmation](../app-confirmation)

### Graph
```mermaid
graph TD;
  app-profile-address-item --> app-confirmation
  page-profile-company --> app-profile-address-item
  page-profile-person --> app-profile-address-item
  page-profile-person-at-company --> app-profile-address-item
  style app-profile-address-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
