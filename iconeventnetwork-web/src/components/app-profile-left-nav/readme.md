# app-profile-left-nav



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description | Type                          | Default     |
| --------------------- | --------- | ----------- | ----------------------------- | ----------- |
| `me` _(required)_     | --        |             | `GetRequestingPersonResponse` | `undefined` |
| `person` _(required)_ | --        |             | `DataResponse<PersonInfo>`    | `undefined` |


## Dependencies

### Used by

 - [page-profile-person](../pages/page-profile-person)
 - [page-profile-person-at-companies](../pages/page-profile-person-at-companies)

### Graph
```mermaid
graph TD;
  page-profile-person --> app-profile-left-nav
  page-profile-person-at-companies --> app-profile-left-nav
  style app-profile-left-nav fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
