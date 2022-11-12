# app-event-planner-item



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type     | Default          |
| ----------------- | ------------------- | ----------- | -------- | ---------------- |
| `Bio`             | `bio`               |             | `string` | `undefined`      |
| `CompanyName`     | `company-name`      |             | `string` | `undefined`      |
| `EventPlannerId`  | `event-planner-id`  |             | `number` | `undefined`      |
| `FirstName`       | `first-name`        |             | `string` | `undefined`      |
| `HeadshotAltText` | `headshot-alt-text` |             | `string` | `undefined`      |
| `HeadshotURL`     | `headshot-u-r-l`    |             | `string` | `noPhotoDataUrl` |
| `LastName`        | `last-name`         |             | `string` | `undefined`      |


## Events

| Event                      | Description | Type                  |
| -------------------------- | ----------- | --------------------- |
| `eventPlannerItemSelected` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [page-event-planners](../pages/page-event-planners)

### Graph
```mermaid
graph TD;
  page-event-planners --> app-event-planner-item
  style app-event-planner-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
