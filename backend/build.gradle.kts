plugins {
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
    id("java")
}

group = "org.example"
version = "1.0-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17
java.targetCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("javax.persistence:javax.persistence-api:2.2")
    runtimeOnly("mysql:mysql-connector-java:8.0.33")
    //MercadoPago
    implementation("com.mercadopago:sdk-java:2.1.24")
//    {
//      exclude(group = "org.sonatype.sisu", module = "sisu-guice")
//    }
    //PDFs

    //implementation(files("libs/sisu-guice-3.1.0-no_aop.jar"))
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")

}

tasks.test {
    useJUnitPlatform()
}
//configurations.all {
//    resolutionStrategy {
//        force("org.iq80.snappy:snappy:0.5")
//    }
//}
