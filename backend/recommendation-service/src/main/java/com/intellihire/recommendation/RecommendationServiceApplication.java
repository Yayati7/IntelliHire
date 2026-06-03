package com.intellihire.recommendation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication(
		exclude = {
				org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration.class,
				org.springframework.boot.hibernate.autoconfigure.HibernateJpaAutoConfiguration.class
		}
)
@EnableFeignClients
public class RecommendationServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(
				RecommendationServiceApplication.class,
				args
		);

	}

}