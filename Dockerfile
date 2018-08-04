FROM node:10 as build

WORKDIR /api
COPY ./package* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:10-alpine
COPY --from=build /api/package* ./
ENV NODE_ENV=production
RUN npm install
COPY --from=build /api/dist .

EXPOSE 3000

CMD node .