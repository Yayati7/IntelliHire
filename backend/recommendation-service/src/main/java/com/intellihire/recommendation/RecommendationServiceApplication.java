package com.intellihire.recommendation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
		exclude = {
				org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration.class,
				org.springframework.boot.hibernate.autoconfigure.HibernateJpaAutoConfiguration.class
		}
)
public class RecommendationServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(
				RecommendationServiceApplication.class,
				args
		);

	}

}