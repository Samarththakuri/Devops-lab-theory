import java.util.ArrayList;
import java.util.List;

public class Calculator {

    // Bug: Division by zero not handled
    public int divide(int a, int b) {
        return a / b;  // Bug: Potential division by zero
    }

    // Code Smell: Unused variable
    public int add(int a, int b) {
        int result = a + b;
        int unused = 100;  // Code smell: Unused variable
        return result;
    }

    // Vulnerability: SQL injection risk
    public String getUser(String userId) {
        String query = "SELECT * FROM users WHERE id = " + userId;
        return query;
    }

    // Code Smell: Duplicate code
    public int multiply(int a, int b) {
        int result = 0;
        for (int i = 0; i < b; i++) {
            result = result + a;
        }
        return result;
    }

    // Duplicate code (same as multiply method)
    public int multiplyAlt(int a, int b) {
        int result = 0;
        for (int i = 0; i < b; i++) {
            result = result + a;
        }
        return result;
    }

    // Code Smell: Too many parameters
    public void processUser(String name, String email, String phone,
                           String address, String city, String state,
                           String zip, String country) {
        System.out.println("Processing: " + name);
    }

    // Bug: Null pointer risk
    public String getName(String name) {
        return name.toUpperCase();
    }

    // Code Smell: Empty catch block
    public void riskyOperation() {
        try {
            int x = 10 / 0;
        } catch (Exception e) {
            // Empty catch block
        }
    }
}