FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY ./node_modules ./node_modules
COPY ./build ./build
#RUN npm run build:prod

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
