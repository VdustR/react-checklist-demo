# React Checklist Demo API Documentation

## List

GET http://localhost:8080/api/tasks

| Query   | Type                                           |
| ------- | ---------------------------------------------- |
| q       | `String` for fuzzy search                      |
| checked | `'true'` / `'false'`                           |
| page    | Nature `Number` greater than `0`(default: `1`) |

| Query   | Type                                                     |
| ------- | -------------------------------------------------------- |
| checked | `'true'` / `'false'`                                     |
| orderBy | `'content'` / `'createdTime'` / `'updatedTime'`(default) |
| order   | `'asc'` / `'desc'`(default)                              |
| page    | Nature `Number` greater than `0`(default: `1`)           |

```javascript
// response
{
  // 10 resources per page
  result: [
    {
      id: String,
      content: String,
      checked: boolean,
      createdTime: String, // ISO
      updatedTime: String // ISO
    }, ...
  ],
  total: Number
}
```

## Create

POST http://localhost:8080/api/tasks

| Field   | Type                                                |
| ------- | --------------------------------------------------- |
| content | Trimmed non-empty `String`, can't not be duplicated |

```javascript
// response
{
  result: String // task.id
}
```

| Error             |
| ----------------- |
| formInvalid       |
| contentDuplicated |

## Update

PUT http://localhost:8080/api/tasks/:id

| Field   | Type                                                |
| ------- | --------------------------------------------------- |
| content | Trimmed non-empty `String`, can't not be duplicated |

```javascript
// response
{
  result: true
}
```

| Error             |
| ----------------- |
| notFound          |
| formInvalid       |
| contentDuplicated |

## Delete

DELETE http://localhost:8080/api/tasks/:id

```javascript
// response
{
  result: true
}
```

| Error    |
| -------- |
| notFound |

## Check

PUT http://localhost:8080/api/tasks/:id/checked

```javascript
// response
{
  result: true
}
```

| Error    |
| -------- |
| notFound |

## Uncheck

DELETE http://localhost:8080/api/tasks/:id/checked

```javascript
// response
{
  result: true
}
```

| Error    |
| -------- |
| notFound |

## Error

```javascript
{
  error: {
    code: String
  }
}
```