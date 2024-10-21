# NewsApi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.
Node js version 18.20.4

## Running Application localy
1. clone project 
2. use nvm to switch node version
  ```bash
nvm use v18.20.4
```
3. npm install to install all package from package.json
4. serve application with angular ClI
```bash
ng serve
```


## for caching we choose interceptor and hashing method
in interceptor check if request hash key exit in localstorage 
if yes so get result from localstorage
else
get from end point

