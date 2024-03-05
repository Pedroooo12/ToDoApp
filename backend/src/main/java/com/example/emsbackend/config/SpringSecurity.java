package com.example.emsbackend.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SpringSecurity implements WebMvcConfigurer {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests((authorize) ->
                        authorize.requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/auth/checkAuth/{id}").permitAll()
                                .requestMatchers("api/tareas/**").permitAll()
                                .requestMatchers("/api/estadisticas/**").permitAll()
                                .requestMatchers("api/categoria/**").permitAll()
                                .requestMatchers("api/importancia/**").permitAll()


                ).logout(
                        logout -> logout
                                .logoutRequestMatcher(new AntPathRequestMatcher("/api/auth/logout")).permitAll()
                                .logoutSuccessHandler((request, response, authentication) -> {
                                    // invalidar la sesión o el token de autenticación si se está utilizando
                                    SecurityContextHolder.clearContext();
                                    response.setStatus(HttpServletResponse.SC_OK);
                                    response.getWriter().flush();
                                    response.getWriter().write("Sesión cerrada exitosamente");
                                })
                );
        return http.build();
    }

    /*@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //Autorizaciones end-points
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/csrf").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }*/



    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // Aquí puedes agregar los orígenes permitidos
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
