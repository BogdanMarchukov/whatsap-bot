FROM node:16.14.2-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build
FROM node:16.14.2-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=development /usr/src/app/dist ./dist
COPY ormconfig.js ./
RUN npm install --only=production
CMD ["npm", "run", "start:prod" ]