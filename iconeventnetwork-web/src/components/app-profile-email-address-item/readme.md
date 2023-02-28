# app-profile-email-address-item



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute              | Description | Type                                                                 | Default     |
| ------------------------ | ---------------------- | ----------- | -------------------------------------------------------------------- | ----------- |
| `appliesTo` _(required)_ | `applies-to`           |             | `AppliesTo.Company \| AppliesTo.Person \| AppliesTo.PersonAtCompany` | `undefined` |
| `companyId`              | `company-id`           |             | `number`                                                             | `undefined` |
| `emailAddressItem`       | --                     |             | `DataResponse<EmailAddressAttributes>`                               | `undefined` |
| `personAtCompanyId`      | `person-at-company-id` |             | `number`                                                             | `undefined` |
| `personId`               | `person-id`            |             | `number`                                                             | `undefined` |


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

- [app-modal](../app-modal)
- [app-confirmation](../app-confirmation)

### Graph
```mermaid
graph TD;
  app-profile-email-address-item --> app-modal
  app-profile-email-address-item --> app-confirmation
  page-profile-company --> app-profile-email-address-item
  page-profile-person --> app-profile-email-address-item
  page-profile-person-at-company --> app-profile-email-address-item
  style app-profile-email-address-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*