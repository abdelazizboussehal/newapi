# NewsApi



## for caching we choose interceptor and hashing method
in interceptor check if request hash key exit in localstorage 
if yes so get result from localstorage
else
get from end point

## for data progress 
we choose button loading of ngprim materials 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.
Node js version 18.20.4

## for enhance ngfor directive we use trackBy
for more understanding watch this video https://www.youtube.com/watch?v=ywPOYBDlQoo

## for UI i try to mix between ngprim and bootstrap
i didnt focus too much on UI.

## offline mode 
of line mode work perfectly with caching in localstorage just i will add check if now network show default liste
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
