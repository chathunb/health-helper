FROM node:16.18-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install  
COPY . .
RUN npm run build
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=development /usr/src/app/build/ .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
