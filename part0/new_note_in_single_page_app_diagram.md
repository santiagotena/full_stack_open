```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes in the form and clicks the save button
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server access the form data and adds it to the array 'notes'
    server-->>browser: URL redirection to Location /exampleapp/notes
    deactivate server
```