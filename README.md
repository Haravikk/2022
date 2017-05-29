# To Twenty Twenty Two
A simple mini-game created for the UK 2017 general election, putting the player in the role of prime minister and presenting them with decisions to make.

## Build Instructions
### Setup
1. [Install npm](https://www.npmjs.com) (also available via `brew install npm`, `port install npm` or `apt-get install npm`)
2. Install `enyo-dev`: `sudo npm install -g enyo-dev`

### Building
1. Navigate to project root, i.e- `cd ~/path/to/project/root`
* Pack the project for testing: `enyo pack --clean .`
* Or pack for production: `enyo pack --clean -P .`
2. Open `dist/index.html` in a browser (Safari & Chrome confirmed to work without issues).
* **Note**: Share buttons (presented at end) do not function fully when run locally, as the local URL is invalid for sharing, so the Facebook dialogue will simply close, and Twitter will not include a URL.
3. If building for production, copy the contents of `meta.html` into the header of `dist/index.html`, there is currently no automatic way to do this. This file contains the meta-tags used to specify Twitter and Facebook cards, as well as to apply Google Analytics code to the page.

## Customisation
### Styling
All key styling via CSS is located in `css/main.less`, in its current form this is just plain CSS.

### General Settings/Turn Structure
General settings and turn structure are located in `data/settings.js`.

Key among these settings is the `phases` array, which specifies each phase of the game (currently a pre-game, main and end-game). Each phase consistents of one or more turns, each structured in a set of stages. Stages determine which events will be selected and presented to the player. Each turn runs through all stages until either no more events remain for display, or the maximum number of choices has been presented (currently 10).

### Scores
To measure the player's progress/outcome there are a number of scores located in `data/scores.js`. Currently these include health, education etc. as well as interest groups to appease or risk their displeasure.

### Events
The key component of the game are the events, these are located in `data/events`, separated into various files. Whenever a file is added or removed, the change **must** be reflected in `data/events/index.js`.

Event files open with the following:
```
var	Events = require('../../classes/Events');
Events.add('category', {
```
Note the `'category'`, this can be used to restrict tags to a category of events (see tags for details).

Events are the basic building-block of the game, representing alerts or decisions for the player. Each is structured as a simple `JSON` object, with the following options:

* **text** (optional): The text of the event, describing what has happened, presenting a choice to make etc.
* **classes** (optional): CSS classes to apply to the event's popup for styling.
* **requires** (optional): The requirements for this event to occur. This can consist of a single requirement, or an array of requirements. Requirements can be used to restrict events to specific turn stages, by requiring a tag that only applies during that stage.
* * String requirements specify a tag (e.g- '.alert').
* * Object requirements specify conditionals against scores. These consist of a key (the id of the score), and a condition stored within a string. For example `{people: '>10'}` indicates that the event requires that the `people` have a score greater than `10`.
* **priority** (optional): A priority assigned to the event (default 0). Events with higher priority are always returned first (once their requirements are met).
* **tags** (optional): Tags to apply once this event is triggered. Can be either a single tag, or an array of multiple tags. See the tags section for details on tag-naming.
* **[score]** (optional): See below.
* **choices** (optional): Choices to present to the user. Come in the following forms:
* * Omitting the choices produces an alert with a default `Okay` button.
* * A `string` value of `'none'` produces an alert event with no buttons (such as the intro splash), which can instead be tapped anywhere to dismiss.
* * An object or array or objects in the following form:
* * * **label**: The label to set for the button.
* * * **tags** (optional): As above, set when the choice is selected.
* * * **[score]** (optional): See below.
* * * **events** (optional): One or more event objects to be added only when this choice is selected. This is particularly useful in keeping the set of events small, and avoiding the need to over-use tags to restrict them. Events specified here have an additional option:
* * * * **delay** (optional): Specifies a delay in turns after which the event will be added. This can be used to produce decisions that have later consequences, or to prevent the event from triggering immediately if it's a match for the current turn stage.

#### Scores
Events and choices may specify scores ids in order to apply changes to the player's scores. For example, the following event will make the `people` happier when selected:
```
{
  text: "The people love you!",
  people: +3,
}
```

#### Alerts
Any event with only a single choice (or the default `Okay` button) is considered to be an alert. Alerts are always selected in preference to events with two or more choices, unless they are given a lower priority. This distinction is also important as turn stages may be restricted to alerts only with the `alertsOnly` option, useful for presenting alerts at the start of a turn only.

#### Tags
Tags are used to manage when events can or cannot occur, and come in global and temporary forms. Tags applied by an event or choice are global, and are retained until explicitly disabled. Temporary tags are applied by turn stages in order to determine which events will be selected.

Unless they are specified with a leading dot character (e.g- `.foo` instead of `foo`), then a tag will be restricted by the category in which it is defined. So a tag `bar` specified in the `foo` category can only be accessed from another category as `foo.bar`. However, a tag of `.bar` can be accessed anywhere as `.bar`.

##### Negation
Tags can be negated by starting them with a leading exclaimation mark, e.g- `!.foo`. In requirements, this identifies a tag that must **not** be present. In a setting context (events and choices) this specifies that the tag will instead be **disabled**.

##### Special Tags
* **.restarted**: This tag is set automatically when then New Game button is pressed, currently used to suppress the splash-screen.

## Credits
Original game concept by C. Rowlands
Developed through Coders for Corbyn/Coders for Labour
