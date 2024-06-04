FROM golang:1.22.3 as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o pspace .
RUN mkdir build
RUN mv pspace public views build/

FROM debian:stable-20240513-slim
WORKDIR /app
COPY --from=builder /app/build /app
EXPOSE 8080
CMD ["./pspace"]
