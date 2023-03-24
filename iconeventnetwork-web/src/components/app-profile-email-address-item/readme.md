# app-profile-email-address-item



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute              | Description | Type                                         | Default     |
| ------------------------ | ---------------------- | ----------- | -------------------------------------------- | ----------- |
| `appliesTo` _(required)_ | `applies-to`           |             | `"company" \| "person" \| "personAtCompany"` | `undefined` |
| `canEdit`                | `can-edit`             |             | `boolean`                                    | `undefined` |
| `companyId`              | `company-id`           |             | `number`                                     | `undefined` |
| `emailAddressItem`       | --                     |             | `DataResponse<EmailAddressAttributes>`       | `undefined` |
| `personAtCompanyId`      | `person-at-company-id` |             | `number`                                     | `undefined` |
| `personId`               | `person-id`            |             | `number`                                     | `undefined` |


## Events

| Event                 | Description | Type                  |
| --------------------- | ----------- | --------------------- |
| `emailAddressDeleted` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [page-profile-company](../pages/page-profile-company)
 - [page-profile-person](../pages/page-profile-person)
 - [page-profile-person-at-company](../pages/page-profile-person-at-company)

### Depends on

- [icn-profile-actions](../icn-profile-actions)
- [icn-message](../icn-message)
- [icn-button](../icn-button)
- [app-confirmation](../app-confirmation)

### Graph
```mermaid
graph TD;
  app-profile-email-address-item --> icn-profile-actions
  app-profile-email-address-item --> icn-message
  app-profile-email-address-item --> icn-button
  app-profile-email-address-item --> app-confirmation
  app-confirmation --> icn-button
  page-profile-company --> app-profile-email-address-item
  page-profile-person --> app-profile-email-address-item
  page-profile-person-at-company --> app-profile-email-address-item
  style app-profile-email-address-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
