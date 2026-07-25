package com.intellihire.auth.config;

import com.intellihire.auth.entity.AuthUser;
import com.intellihire.auth.entity.Role;
import com.intellihire.auth.repository.AuthRepository;
import com.intellihire.auth.service.RefreshTokenService;
import com.intellihire.auth.entity.RefreshToken;
import com.intellihire.auth.util.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Slf4j
@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private static final String DEVELOPER_EMAIL = "yayatimannsingh7@gmail.com";

    private final AuthRepository repository;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public OAuthSuccessHandler(
            AuthRepository repository,
            JwtUtil jwtUtil,
            RefreshTokenService refreshTokenService
    ){
        this.repository = repository;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        String intendedRole = (String) request.getSession().getAttribute("oauth_intended_role");
        if (intendedRole == null) intendedRole = "USER";

        boolean isDeveloper = DEVELOPER_EMAIL.equalsIgnoreCase(email);

        // 1) Developer login attempted by a non-authorized email -> deny outright
        if ("ADMIN".equalsIgnoreCase(intendedRole) && !isDeveloper) {

            log.warn(
                    "ACTION={} service={} user={} details={}",
                    "DEVELOPER_LOGIN_DENIED",
                    "AUTH-SERVICE",
                    email,
                    "Non-authorized email attempted developer login"
            );

            response.sendRedirect(
                    "http://localhost:5173/login-success?error=access_denied&role=ADMIN"
            );

            return;
        }

        // 2) Existing account with a DIFFERENT role than the portal used -> deny with a clear message
        if (!isDeveloper) {

            Optional<AuthUser> existing = repository.findByEmail(email);

            if (existing.isPresent()) {

                String actualRole = existing.get().getRole().name();

                if (!actualRole.equalsIgnoreCase(intendedRole)) {

                    log.warn(
                            "ACTION={} service={} user={} details={}",
                            "ROLE_MISMATCH_LOGIN_DENIED",
                            "AUTH-SERVICE",
                            email,
                            "Account is " + actualRole + ", attempted login as " + intendedRole
                    );

                    response.sendRedirect(
                            "http://localhost:5173/login-success?error=role_mismatch"
                                    + "&actualRole=" + actualRole
                                    + "&attemptedRole=" + intendedRole
                    );

                    return;
                }
            }
        }

        String finalIntendedRole = intendedRole;

        AuthUser user = repository.findByEmail(email).orElseGet(() -> {

            Role roleToAssign;
            if (isDeveloper) {
                roleToAssign = Role.ADMIN;
            } else if ("RECRUITER".equalsIgnoreCase(finalIntendedRole)) {
                roleToAssign = Role.RECRUITER;
            } else {
                roleToAssign = Role.USER;
            }

            return repository.save(
                    AuthUser.builder()
                            .email(email)
                            .name(name)
                            .provider("GOOGLE")
                            .role(roleToAssign)
                            .build()
            );
        });

        if (isDeveloper && user.getRole() != Role.ADMIN) {
            user.setRole(Role.ADMIN);
            user = repository.save(user);
        }

        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name());
        RefreshToken refresh = refreshTokenService.create(user);

        log.info(
                "ACTION={} service={} user={} details={}",
                "GOOGLE_LOGIN",
                "AUTH-SERVICE",
                email,
                "OAuth2 authentication successful, role=" + user.getRole()
        );

        String redirectUrl = "http://localhost:5173/login-success"
                + "?accessToken=" + URLEncoder.encode(accessToken, StandardCharsets.UTF_8)
                + "&refreshToken=" + URLEncoder.encode(refresh.getToken(), StandardCharsets.UTF_8)
                + "&userId=" + user.getId()
                + "&name=" + URLEncoder.encode(user.getName() == null ? "" : user.getName(), StandardCharsets.UTF_8)
                + "&email=" + URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8)
                + "&role=" + user.getRole().name();

        response.sendRedirect(redirectUrl);
    }
}