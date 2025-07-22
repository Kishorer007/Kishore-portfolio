# Use official Java 17 image
FROM openjdk:17

# Copy the jar file
COPY target/*.jar app.jar

# Expose Spring Boot default port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "/app.jar"]
