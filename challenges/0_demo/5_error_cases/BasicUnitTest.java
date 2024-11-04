
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

public class BasicUnitTest {

    @Test
    @DisplayName("Test method1 returns 1")
    public void method1EQ1() {
        Main main = new Main();
        assertEquals(1, main.method1());
    }


    @Test
    @DisplayName("Test method2 returns 2")
    public void method2EQ2() {
        Main main = new Main();
        assertEquals(2, main.method2());
    }
}