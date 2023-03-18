# app-profile-phone-item



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute              | Description | Type                                         | Default     |
| ------------------------ | ---------------------- | ----------- | -------------------------------------------- | ----------- |
| `appliesTo` _(required)_ | `applies-to`           |             | `"company" \| "person" \| "personAtCompany"` | `undefined` |
| `canEdit`                | `can-edit`             |             | `boolean`                                    | `undefined` |
| `companyId`              | `company-id`           |             | `number`                                     | `undefined` |
| `personAtCompanyId`      | `person-at-company-id` |             | `number`                                     | `undefined` |
| `personId`               | `person-id`            |             | `number`                                     | `undefined` |
| `phoneNumberItem`        | --                     |             | `DataResponse<PhoneNumberAttributes>`        | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `phoneNumberDeleted` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [page-profile-company](../pages/page-profile-company)
 - [page-profile-person](../pages/page-profile-person)
 - [page-profile-person-at-company](../pages/page-profile-person-at-company)

### Depends on

- [icn-message](../icn-message)
- [icn-profile-actions](../icn-profile-actions)
- [app-confirmation](../app-confirmation)

### Graph
```mermaid
graph TD;
  app-profile-phone-number-item --> icn-message
  app-profile-phone-number-item --> icn-profile-actions
  app-profile-phone-number-item --> app-confirmation
  page-profile-company --> app-profile-phone-number-item
  page-profile-person --> app-profile-phone-number-item
  page-profile-person-at-company --> app-profile-phone-number-item
  style app-profile-phone-number-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
