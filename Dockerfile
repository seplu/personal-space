FROM golang:1.22.3 as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN go build -ldflags="-s -w" -o pspace .
RUN mkdir build
RUN mv pspace public views build/

FROM debian:stable-20240513-slim
LABEL maintainer="Sebastian 'Seplu' Płudowski"
LABEL version="0.1.0"
WORKDIR /app
COPY --from=builder /app/build /app
EXPOSE 8080
CMD ["./pspace"]
