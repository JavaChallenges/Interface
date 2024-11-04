Beispiele zu verschiedenen fehlertypen und wie diese kommuniziert werden

### Fehlerfreies Beispiel
```java
public class Main {
    public int method1() {
        return 1;
    }
    
    public int method2() {
        return 2;
    }
}
```

### Compiler Error
```java
public class Main {
    public int method1() {
        return 1 // missing semicolon
    }
    
    public int method2() {
        return 2;
    }
}
```

### Single failing test
```java
public class Main {
    public int method1() {
        return 2; //should return 1
    }
    
    public int method2() {
        return 2;
    }
}
```


### All tests failing 
```java
public class Main {
    public int method1() {
        return 2; //should return 1
    }
    
    public int method2() {
        return 1; //should return 2
    }
}
```