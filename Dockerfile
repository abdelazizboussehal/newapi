FROM node:18.20.4 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .
RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist/news-api /usr/share/nginx/html

# use default ngx config /etc/nginx/conf.d/default.conf




EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
