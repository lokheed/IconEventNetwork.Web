# app-event-planner-item



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                    | Type                                        | Default     |
| --------- | --------- | ------------------------------ | ------------------------------------------- | ----------- |
| `planner` | --        | The details about the planner. | `DataResponse<GetFoundingPlannersResponse>` | `undefined` |


## Events

| Event                      | Description | Type                  |
| -------------------------- | ----------- | --------------------- |
| `eventPlannerItemSelected` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [page-event-planners](../pages/page-event-planners)

### Depends on

- [app-responsive-image](../app-responsive-image)

### Graph
```mermaid
graph TD;
  app-event-planner-item --> app-responsive-image
  page-event-planners --> app-event-planner-item
  style app-event-planner-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
