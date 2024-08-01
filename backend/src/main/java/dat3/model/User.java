package dat3.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;

import java.io.Serial;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@NamedQueries(@NamedQuery(name = "User.deleteAllRows", query = "DELETE from User"))
@Getter
@NoArgsConstructor
public class User implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false, fetch = FetchType.EAGER)
    private UUID id;

    @Basic(optional = false)
    @Column(name = "user_name", length = 25)
    private String username;

    @Basic(optional = false)
    @Column(name = "email", length = 50)
    private String email;

    @Basic(optional = false)
    @Column(name = "user_password", length = 255, nullable = false)
    private String password;

    @JoinTable(name = "user_roles", joinColumns = {
            @JoinColumn(name = "user_name", referencedColumnName = "user_name")}, inverseJoinColumns = {
            @JoinColumn(name = "role_name", referencedColumnName = "role_name")})
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roleList = new LinkedHashSet<>();

    public User(String username, String userPassword) {
        this.username = username;
        this.password = BCrypt.hashpw(userPassword, BCrypt.gensalt());
    }

    public Set<String> getRolesAsStrings() {
        if (roleList.isEmpty()) {
            return null;
        }
        Set<String> rolesAsStrings = new LinkedHashSet<>();
        roleList.forEach((role) -> {
            rolesAsStrings.add(role.getRoleName());
        });
        return rolesAsStrings;
    }
    public boolean verifyPassword(String pw) {
        return BCrypt.checkpw(pw, password);
    }

    public void setPassword(String userPassword) {
        this.password = BCrypt.hashpw(userPassword, BCrypt.gensalt());
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void addRole(Role userRole) {
        roleList.add(userRole);
    }

}
