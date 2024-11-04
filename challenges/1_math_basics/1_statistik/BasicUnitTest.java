
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

public class BasicUnitTest {

    @Test
    @DisplayName("Prüfe auf Werte aus der Tabelle")
    public void method1EQ1() {
        int[][] table = {
			{3, 2},
			{8, 19},
			{15, 63}
		};
        Main main = new Main();
        for (int[] row : table) {
            assertEquals(row[1], main.calcSumAndCountAllNumbersDivBy_2_Or_7(row[0]));
        }
    }
}