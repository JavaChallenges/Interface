
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

public class FirstUnitTest {

    @Test
    @DisplayName("Test 1")
    public void whenThis_thenThat() {
        assertTrue(false);
    }

    @Test
    @DisplayName("Test 2")
    public void whenSomething_thenSomething() {
        assertTrue(true);
    }

    @Test
    @DisplayName("Test 3")
    public void whenSomethingElse_thenSomethingElse() {
        assertTrue(true);
    }
}