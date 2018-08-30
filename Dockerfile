FROM node:10 as build

WORKDIR /server
COPY ./package* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:10-alpine
WORKDIR /server
COPY --from=build /server/package* ./
ENV NODE_ENV=production
RUN npm ci
COPY --from=build /server/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]