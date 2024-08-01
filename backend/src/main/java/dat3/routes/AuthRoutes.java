package dat3.routes;

import dat3.controller.impl.AuthController;
import dat3.security.RouteRoles;
import io.javalin.apibuilder.EndpointGroup;

import static io.javalin.apibuilder.ApiBuilder.post;

public class AuthRoutes {
private final AuthController authController = new AuthController();

    protected EndpointGroup getRoutes() {
        return () -> {
                post("/login", authController::login, RouteRoles.ANYONE);
                post("/register", authController::register, RouteRoles.ANYONE);
        };
    }
}
