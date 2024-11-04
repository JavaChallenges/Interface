Einfachste Form einer Challenge. Es wird eine einzelne Klasse erstellt, die eine Methode implementiert, welche getestet wird.

# Basis Ordnerstruktur
```plaintext
└── challenges                    <- Root-Verzeichnis für alle Challenges
    ├── config.yml                <- Konfiguration für übersichtsseite
    └── 0_category                <- Kategorie-Verzeichnis
        ├── config.yml            <- Konfiguration für Kategorie-Übersichtsseite
        └── 1_challenge           <- Challenge-Verzeichnis
            ├── config.yml        <- Konfiguration für Challengeseite
            ├── > 1 UnitTest.java <- Mindestens eine Testklasse die den Code der Challenge testet
            └── description.md    <- Beschreibung der Challenge
```