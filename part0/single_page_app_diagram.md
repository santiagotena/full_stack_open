```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: HTTP
    activate server
    server-->>browser: payload
    deactivate server
```