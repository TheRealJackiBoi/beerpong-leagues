package dat3.routes;

import dat3.controller.impl.AuthController;
import dat3.security.RouteRoles;
import io.javalin.apibuilder.EndpointGroup;

import static io.javalin.apibuilder.ApiBuilder.*;

public class UserRoutes {
    //private final AuthController userController = new AuthController();

    protected EndpointGroup getRoutes() {
        return () -> {
            //get("/", userController., RouteRoles.ADMIN);
            path("/:id", () -> {

            });
        };
    }
}