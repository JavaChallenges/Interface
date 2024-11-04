
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

public class BasicUnitTest {

    @Test
    @DisplayName("Compiled")
    public void whenThis_thenThat() {
        Main main = new Main();
        Additional additional = new Additional();
        main.method1();
        additional.method2();
        assertTrue(true);
    }
}