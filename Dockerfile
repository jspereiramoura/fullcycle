FROM golang:1.20.13-alpine3.19 as APP

WORKDIR /src/app
COPY /app .
RUN apk update && apk add upx bash
RUN go mod init jspereiramoura/fullcycle \
    && go build -o fullcycle -ldflags "-s -w" \
    && upx ./fullcycle --lzma --best

FROM scratch
COPY --from=APP /src/app/fullcycle fullcycle
CMD ["./fullcycle"]

