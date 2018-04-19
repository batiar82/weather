FROM openjdk:8-jre-alpine
COPY ./target/weather-0.0.1-SNAPSHOT.jar /usr/src/weather/
WORKDIR /usr/src/weather
EXPOSE 8080
CMD ["java", "-jar", "weather-0.0.1-SNAPSHOT.jar"]