# app-profile-social-media-item



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute    | Description | Type                                  | Default     |
| ----------------- | ------------ | ----------- | ------------------------------------- | ----------- |
| `canEdit`         | `can-edit`   |             | `boolean`                             | `undefined` |
| `companyId`       | `company-id` |             | `number`                              | `undefined` |
| `socialMediaItem` | --           |             | `DataResponse<SocialMediaAttributes>` | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `socialMediaDeleted` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [page-profile-company](../pages/page-profile-company)

### Depends on

- [icn-profile-actions](../icn-profile-actions)
- [icn-message](../icn-message)
- [icn-button](../icn-button)

### Graph
```mermaid
graph TD;
  app-profile-social-media-item --> icn-profile-actions
  app-profile-social-media-item --> icn-message
  app-profile-social-media-item --> icn-button
  icn-button --> icn-modal
  icn-button --> icn-button
  page-profile-company --> app-profile-social-media-item
  style app-profile-social-media-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
