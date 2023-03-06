# app-modal



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description | Type      | Default     |
| --------------------- | ----------------------- | ----------- | --------- | ----------- |
| `dialogTitle`         | `dialog-title`          |             | `string`  | `undefined` |
| `primaryActionText`   | `primary-action-text`   |             | `string`  | `'Save'`    |
| `secondaryActionText` | `secondary-action-text` |             | `string`  | `'Cancel'`  |
| `visible`             | `visible`               |             | `boolean` | `false`     |


## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `primaryModalClick`   |             | `CustomEvent<any>` |
| `secondaryModalClick` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [app-profile-address-item](../app-profile-address-item)
 - [app-profile-email-address-item](../app-profile-email-address-item)
 - [app-profile-name-item](../app-profile-name-item)
 - [app-profile-phone-number-item](../app-profile-phone-number-item)

### Graph
```mermaid
graph TD;
  app-profile-address-item --> app-modal
  app-profile-email-address-item --> app-modal
  app-profile-name-item --> app-modal
  app-profile-phone-number-item --> app-modal
  style app-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
