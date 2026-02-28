package com.demo.pipers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PipersApplication {

	public static void main(String[] args) {
		SpringApplication.run(PipersApplication.class, args);
	}

}
