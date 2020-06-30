
# Steward Client
This library is used to generate material table using [spring boot pagination](https://docs.spring.io/spring-data/rest/docs/2.0.0.M1/reference/html/paging-chapter.html) response.

##Features
- Pagination
- Sorting (including date range)
- Searching

##Installation
1. Add the following package to your package.json "steward-client": "1.0.0"
2. Replace the file path  in your package.json with the new path
3. Execute npm install

##API
###Properties
| Name | Description |
| --- | --- |
| @Input() endpoint: string | Resource url endpoint e.g. "/users" OR "/users?status=1" |
| @Input() selection: [SelectionModel](https://github.com/angular/material2/blob/master/src/cdk/collections/selection.ts)<any>| Table selection model |  

