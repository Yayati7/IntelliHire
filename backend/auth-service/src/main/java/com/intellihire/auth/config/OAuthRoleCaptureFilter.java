package com.intellihire.auth.config;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

import java.io.IOException;

public class OAuthRoleCaptureFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;

        if (req.getRequestURI().startsWith("/oauth2/authorization/")) {
            String role = req.getParameter("role");
            if (role != null) {
                req.getSession(true).setAttribute("oauth_intended_role", role);
            }
        }

        chain.doFilter(request, response);
    }
}