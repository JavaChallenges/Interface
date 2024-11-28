# Zu JavaChallenges beitragen

Als allererstes, vielen Dank, dass Du dir die Zeit nehmen möchtest deinen Teil zu diesem Projekt beizutragen! ❤️

Alle Arten von Hilfe ist erwünscht und wird wertgeschätzt. Im [Inhaltsverzeichnis](#inhaltsverzeichnis) findest Du verschiedene Möglichkeiten zu helfen und Details darüber, wie dieses Projekt bearbeitet wird. Bitte stelle sicher, dass Du den jeweils entsprechenden Abschnitt gelesen hast, bevor Du anfängst etwas beizutragen. Das macht es nicht nur uns einfacher deine Unterstützung in das Projekt aufzunehmen, sondern ersparrt auch dir unnötige Arbeit. Wir freuen uns auf deine Beiträge. 🎉

> Dir gefällt das Projekt, aber Du hast keine Zeit etwas beizutragen? Das ist auch in Ordnung. Es gibt andere einfache Möglichkeiten, das Projekt zu unterstützen und deine Wertschätzung zu zeigen:
> - Verleihe dem Projekt einen Stern
> - Gib uns Feedback darüber ob Du mit Hilfe des Projekts besser lernen konntest und was wir besser machen können 

> [!TIP]\
> In hier geht es um den technischen Teil der Website von JavaChallenges, wenn Du bei der Erstellung von Challenges helfen möchtest oder inhaltliche Fehler gefunden hast, schau [hier](https://github.com/JavaChallenges/Challenges/contribute) vorbei

## Inhaltsverzeichnis

- [Ich habe eine Frage](#ich-habe-eine-frage)
- [Ich möchte einen Beitrag leisten](#ich-möchte-einen-beitrag-leisten)
- [Bugs melden](#bugs-melden)
- [Verbesserungsvorschläge](#verbesserungsvorschläge)
- [Dein erster Code-Beitrag](#dein-erster-codebeitrag)
- [Styleguides](#styleguides)
- [Commit-Nachrichten](#commit-nachrichten)
- [Dem Projektteam beitreten](#dem-projektteam-beitreten)


## Ich habe eine Frage

> Wir sind gern für alle Fragen da, bedenke dabei aber bitte, das wir nur begrenzt auf inhaltliche Fragen eingehen können und diese Seite vor allem technischen Fragen dient

Bevor Du eine Frage stellst, suchen am besten nach bestehenden [Issues](https://github.com/JavaChallenges/Interface/issues), die dir helfen könnten. Falls D ein passendes Thema gefunden hast und noch Klärungsbedarf haben, kannst Du deine Frage in dieses Thema schreiben. Das hilft dabei anderen zu Helfen, die evlt. die selbe Frage haben, schneller an Antworten zu kommen und hat für dich den Vorteil, dass Du ggf. garnicht auf unsere Antwort warten musst, sondern direkt eine findest.

Wenn eine Antwort auf deine Frage unauffindbar beleibt, empfehlen wir Folgendes:

- Eröffnen ein [Issue](https://github.com/JavaChallenges/Interface/issues/new/choose).
- Gib so viel Kontext wie möglich über das Problem an, das Du hast.
- Halte dich bitte an die Vorgaben in den Templates

Wir werden uns dann so schnell wie möglich um das Problem kümmern.

## Ich möchte einen Beitrag leisten

> [!CAUTION]\
> Rechtlicher Hinweis\
> Wenn Du einen Beitrag zu diesem Projekt leistest, musst Du versichern, dass Du 100% des Inhalts verfasst hast, dass Du die erforderlichen Rechte an dem Inhalt hast und dass der Inhalt, den Du beiträgst, unter der Projektlizenz zur Verfügung gestellt werden darf.

### Bugs melden

#### Vor dem Einreichen eines Fehlerberichts

Ein guter Fehlerbericht sollte so geschrieben sein, dass wir nicht um weitere Informationen bitten müssen. Deshalb bitten wir Dich, sorgfältig zu recherchieren, Informationen zu sammeln und das Problem in deinem Bericht detailliert zu beschreiben. Bitte halte Dich dafür an folgende Schrittliste, damit wir einen möglichen Fehler so schnell wie möglich beheben können.

- Stelle sicher, dass Du eine aktuelle Version deines Browsers verwendest und keine Erweiterungen installiert sind, die unter Umständen das JavaScript der Seite manipulieren
- Um zu sehen, ob andere Benutzer das gleiche Problem wie Du haben (und möglicherweise bereits gelöst haben), überprüf bitte, ob es nicht bereits einen Fehlerbericht für Ihren Fehler im [bug tracker](https://github.com/JavaChallenges/Interface/issues?q=label%3Abug) gibt.
- Sammel Informationen über den Fehler:
- Betriebssystem, Plattform und Version (Windows, Linux, macOS, x86, ARM, Chrome, Safari, ...)
- Möglicherweise deine Eingabe und die erhaltene Ausgabe
- Kannst Du das Problem zuverlässig reproduzieren?

#### Wie reiche ich einen guten Fehlerbericht ein?

Wir verwenden GitHub issues, um Bugs und Fehler zu verfolgen. Wenn Du auf ein Problem mit dem Projekt stößt:

- Eröffne ein [Issue](https://github.com/JavaChallenges/Interface/issues/new?assignees=&labels=bug%2C+needs-review&projects=&template=bug_report.md&title=%5BBUG%5D+DEIN+TITEL) mit dem Template Bug report
- Halte dich an die Vorgaben aus dem Template. Nur so können wir schnellstmöglich mit der Fehlerbehebung beginnen.
- Geben Sie die Informationen an, die Sie im vorherigen Abschnitt gesammelt haben.
- Achte auf dein eMail Postfach oder die GitHub Benachrichtigungen, sodass wir dich schnell erreichen können, sollten wir doch noch irgendwelche Rückfragen haben

Sobald es eingereicht ist:

- Das Projektteam wird das Problem entsprechend kennzeichnen.
- Ein Teammitglied wird versuchen, das Problem mit den von Dir angegebenen Schritten zu reproduzieren. Dieser Teil ist wirklich unglaublich wichtig, denn wenn wir die Fehler nicht reproduzieren können, können wir auch nicht daran Arbeiten. Achte also wirklich gut darauf, dass Du ausführlich beschreibst wie der Fehler zustande kommt.
- Wenn das Team in der Lage ist, das Problem zu reproduzieren, wird es als `needs-fix` markiert, sowie möglicherweise andere Tags (wie `critical`), und das Problem wird zur [Implementierung durch jemanden](#dein-erster-codebeitrag) überlassen.

### Verbesserungsvorschläge

Dieser Abschnitt führt dich durch das Einreichen eines Verbesserungsvorschlags für JavaChallenges, **einschließlich komplett neuer Funktionen und Verbesserungen bestehender Funktionen**. Wenn Du diese Richtlinien befolgst, hilfst Du dabei uns deinen Vorschlag zu verstehen und ihn möglichst schnell zu implementieren.

#### Bevor Du einen Vorschlag einreichst

- Führe eine [Suche](https://github.com/JavaChallenges/Interface/issues) durch, um zu sehen, ob bereits etwas ähnliches vorgeschlagen wurde. Wenn ja, füge einen Kommentar zu dem bestehenden Issue hinzu, anstatt ein neues zu eröffnen, damit alle Ideen zum selben Thema an einem Punkt gesammelt werden können.
- Finde heraus, wie Deine Idee in das Projekt passt. Es liegt an Dir, uns mit überzeugenden Argumenten von den Vorzügen deiner Idee zu überzeugen. Denk daran, dass wir Funktionen wollen, die für die Mehrheit der Nutzer nützlich sind und die Seite nicht völlig überladen wird.

#### Wie kann ich einen guten Verbesserungsvorschlag einreichen?

Verbesserungsvorschläge werden als [GitHub issues](https://github.com/JavaChallenges/Interface/issues) verfolgt.

- Verwende einen **klaren und beschreibenden Titel** für das Thema, um den Vorschlag zu identifizieren.
- Gib so viele Details wie möglich an, damit wir deinen Vorschlag so gut wie möglich verstehen.
- **Beschreibe das aktuelle Verhalten** und **erläutere, welches Verhalten Du stattdessen erwarten würdest und warum**. An dieser Stelle kannst Du auch gern sagen, welche Alternativen für dich nicht funktionieren würde.
- Vielleicht kannst Du **Screenshots oder Bildschirmaufnahmen** anfügen, die Dir helfen, die Schritte zu demonstrieren oder den Teil hervorzuheben, auf den sich dein Vorschlag bezieht. Wir empfehlen [LICEcap](https://www.cockos.com/licecap/), um GIFs unter macOS und Windows aufzunehmen, und den eingebauten [Bildschirmrecorder in GNOME](https://help.gnome.org/users/gnome-help/stable/screen-shot-record.html.en) oder [SimpleScreenRecorder](https://github.com/MaartenBaert/ssr) unter Linux.
- **Erläuter, warum diese Erweiterung für die meisten JavaChallenges-Benutzer nützlich** wäre. Weise auch gern auf andere Projekte hin, die die dir evtl. als Inspiration gedient haben und wir uns genauer anschauen können.
- Eröffne ein [Issue](https://github.com/JavaChallenges/Interface/issues/new?assignees=&labels=enhancement%2C+needs-review&projects=&template=verbesserungsvorschlag.md&title=%5BVerbesserungsvorschlag%5D+DEIN+TITEL) mit dem Template "Neue Funktion" oder "Verbesserungsvorschlag" abhängig davon, was auf deinen Vorschlag besser zutrifft.

### Dein erster Codebeitrag
1. Fork it (<https://github.com/JavaChallenges/Interface/fork>)
2. Erstelle einen Feature Branch (`git checkout -b feature/fooBar`)
3. Commite deine Änderungen (`git commit -am 'feat(foo): barBaz'`)[Halte dich hierbei bitte an unsere [Styleguides](#styleguides)]
4. Pushe sie auf den Feature Branch (`git push origin feature/fooBar`)
5. Erstelle eine neue Pull Request

### Du möchtest etwas inhaltliches Beitragen?
Wenn Du lieber an den eigentlichen Challenges mitarbeiten möchtest dann schau mal [hier](https://github.com/JavaChallenges/Challenges/contribute) vorbei.

## Development setup
Benötigte Umgebungsversionen:
* Node: `>=22.0.0`
* NPM: `>=10.9.0`
* GIT: `latest`
* Docker: `latest`(Optional)

```sh
npm install
npm run dev
```

## Styleguides
### Commit-Nachrichten
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Um die Versionierung und die Erstellung der Changelogs zu automatisieren nutzen wir semantic-release mit dem [Angular Commit Message Format](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).
Damit dies jederzeit Reibungslos funktioniert, bitten wir jeden Helfer darum, sich an diesen Standart zu halten.

Es gibt verschiedene Tools, die es einem erleichtern, den Standart einzuhalten. Für IDEA IDEs wäre dies bspw. [GithubToolbox](https://plugins.jetbrains.com/plugin/7499-gittoolbox). Wir empfehlen es dringend ein solches Tool zu verwenden. 

Diese RegEx kann verwendet werden um die Commit-Message auf Richtigkeit zu prüfen: `(?:feat|fix|perf|style|test|chore|ci|build|revert|docs|refactor)(?:\(.*\))?: [A-Z].*\s?\s?.*?` 

## Dem Projektteam beitreten
Wenn Du längerfristig an dem Projekt mitarbeiten möchtest, bist Du herzlich dazu eingeladen. Fang einfach damit an ein paar Pull Requests einzureichen und komm auf einen von uns zu.

_Dieser Leitfaden basiert auf [contributing.md](https://contributing.md/generator)!_
