FROM node:16.18-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=dev
COPY . .
RUN npm run build

FROM node:16.18-alpine AS production

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY . .
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
