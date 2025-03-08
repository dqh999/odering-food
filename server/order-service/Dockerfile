FROM gradle:8.11.1-jdk23 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon -x test

FROM openjdk:23-jdk-slim
WORKDIR /app
COPY build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
