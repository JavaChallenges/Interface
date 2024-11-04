Einfachste Form einer Challenge. Es wird eine einzelne Klasse erstellt, die eine Methode implementiert, welche getestet wird.

### config.json
```json
{
  "friendlyName": "Beispiel mehrere Klassen",
  "difficulty": "4",
  "templates": [
    {
      "title": "Main.class:",
      "classname": "Main",
      "content": "public class Main {\n    public void method1() {\n        //Implementierung Methode 1\n    }\n}"
    },
    {
      "title": "Additional.class:",
      "classname": "Additional",
      "content": "public class Additional {\n    public void method2() {\n        //Implementierung Methode 2\n    }\n}"
    }
  ]
}
```