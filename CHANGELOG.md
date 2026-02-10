# Changelog
All notable changes to this project will be documented in this file. See [conventional commits](https://www.conventionalcommits.org/) for commit guidelines.

- - -
## v0.7.0 - 2026-02-10
#### Bug Fixes
- **(Card)** fix long card not appearing in time - (ce9bac3) - Martin Kinoo
- **(FloatingContact)** hide properly when crossing contact form - (e62cd8b) - Martin Kinoo
- **(NavBar)** prevent overlapping animation - (0a1407f) - Martin Kinoo
- **(NavBar)** Increase bound for visibility detection - (1aef555) - Martin Kinoo
- **(Spotlight)** fix mouse follow on scroll - (2b04904) - Martin Kinoo
- **(design-system)** correct CSS selector for NavBar color demo - (d0f6e97) - Martin Kinoo
- **(gyroTracker)** disabled until we found a better solution (#27) - (777ada1) - Martin Kinoo
- **(gyroTracker)** remove drift (not great solution) (#26) - (2d00f6e) - Martin Kinoo
- **(gyroTracker)** drift to ensure base keep stable - (11a2e00) - Martin Kinoo
- **(gyroTracker)** calibrate the reading center point - (91c4293) - Martin Kinoo
- **(index)** _ on unused variable - (515913d) - Martin Kinoo
- **(revealSection)** detect intersection before on mobile - (023cefd) - Martin Kinoo
- fix astro check warning - (e601227) - Martin Kinoo
#### Build system
- **(astro)** explicitely use bun - (8af7a6b) - Martin Kinoo
#### Continuous Integration
- **(eslint)** allow empty function - (37fe883) - Martin Kinoo
- add articles to git ignore - (cb7e73b) - Martin Kinoo
#### Documentation
- **(Header)** simplify documentation, remove menu items - (1f4f0db) - Martin Kinoo
- **(design-system)** remove obvious descriptions - (e6c21d6) - Martin Kinoo
- **(design-system)** add Section pattern and update architecture - (b88a388) - Martin Kinoo
- move commands section earlier - (c7d6927) - Martin Kinoo
- simplify README - (5efa90f) - Martin Kinoo
#### Features
- **(HeaderLink)** add tooltip on hover for icon variant - (0542ca8) - Martin Kinoo
- **(IconButton)** add href and color props - (e5f4112) - Martin Kinoo
- **(Spotlight)** mobile: add gyroscope support or default to top-left corner position) - (9dddda9) - Martin Kinoo
- **(Spotlight)** brightrer effect - (65cbe8e) - Martin Kinoo
- **(atoms)** add IconButton and BurgerIcon components - (9ce9838) - Martin Kinoo
- **(button)** add secondary variant, update Me contacter - (a909bbd) - Martin Kinoo
- **(ci)** add cocogitto for auto bump, changelog and deploy - (95f40ba) - Martin Kinoo
- **(design-system)** add framework icons (Astro/Solid) to sidebar and titles - (5f0a91e) - Martin Kinoo
- **(design-system)** add responsive burger menu for mobile navigation - (8803f00) - Martin Kinoo
- **(design-system)** add reusable DS documentation components - (30c2d62) - Martin Kinoo
- **(header)** extract HeaderLink atom with documentation - (b802872) - Martin Kinoo
- **(header)** add design system link - (2e1c1d6) - Martin Kinoo
- **(navbar)** add colorfull underline effect - (296c851) - Martin Kinoo
- **(onHeroAnimationComplete)** add status completed/cancelled - (cdf14b6) - Martin Kinoo
- **(revealCard)** add lighter animation for mobile - (88da04d) - Martin Kinoo
#### Miscellaneous Chores
- **(version)** v0.6.3 - (2653ee8) - github-actions[bot]
- **(version)** v0.6.2 - (3d9f7bb) - github-actions[bot]
- **(version)** v0.6.1 - (aa45b03) - github-actions[bot]
- **(version)** v0.6.0 - (7feab60) - github-actions[bot]
- **(version)** v0.5.0 - (93256f1) - github-actions[bot]
- **(version)** v0.4.0 - (a617767) - github-actions[bot]
- design system (#28) - (8acf30d) - Martin Kinoo
#### Refactoring
- **(Card)** more atomic approach - (11e4c8b) - Martin Kinoo
- **(Card)** merge realisation card into card - (de576d7) - Martin Kinoo
- **(NavBar)** simplify code - (7e98be7) - Martin Kinoo
- **(Spotlight)** move mouse tracking to its own file - (cf115e3) - Martin Kinoo
- **(animation)** add event-based animation timing for heroAnimationComplete (#21) - (d67befc) - Martin Kinoo
- **(animations)** move all animations files to their own folder lib/animations - (e627b43) - Martin Kinoo
- **(button)** unify primary/secondary button styles - (bd98129) - Martin Kinoo
- **(component)** implement new viewDetection - (ceff163) - Martin Kinoo
- **(components)** reorganize to contextual atomic design - (123bdc8) - Martin Kinoo
- **(design-system)** update all .ds.astro to use DSSectionHeader - (cf686d0) - Martin Kinoo
- **(design-system)** modular architecture with scoped CSS - (a3e4158) - Martin Kinoo
- **(header)** extract HeaderMenu component with consistent styling - (1ce6e65) - Martin Kinoo
- **(reveal)** add revealCrd/Section to lib from index - (5f75667) - Martin Kinoo
- **(spotlight)** move spotlight code to lib/dom - (2643b42) - Martin Kinoo
- **(viewDetection)** split viewDetection in their own concern, in lib/dom - (59e1cd6) - Martin Kinoo
- reóve unused components - (af05745) - Martin Kinoo
#### Style
- **(design-system)** add right padding to sidebar - (f21c6af) - Martin Kinoo

- - -

## v0.6.3 - 2026-02-09
#### Bug Fixes
- **(gyroTracker)** disabled until we found a better solution (#27) - (4c6f958) - Martin Kinoo
#### Miscellaneous Chores
- **(version)** v0.6.2 - (add7a2a) - github-actions[bot]
- design system (#28) - (4454e5a) - Martin Kinoo

- - -

## v0.6.2 - 2026-02-01
#### Bug Fixes
- **(gyroTracker)** disabled until we found a better solution (#27) - (4c6f958) - Martin Kinoo
- **(gyroTracker)** remove drift (not great solution) (#26) - (323e71c) - Martin Kinoo
#### Miscellaneous Chores
- **(version)** v0.6.1 - (050dd9e) - github-actions[bot]

- - -

## v0.6.1 - 2026-02-01
#### Bug Fixes
- **(gyroTracker)** remove drift (not great solution) (#26) - (323e71c) - Martin Kinoo
- **(gyroTracker)** drift to ensure base keep stable - (8e8da4e) - Martin Kinoo
- **(gyroTracker)** calibrate the reading center point - (65534ae) - Martin Kinoo
#### Miscellaneous Chores
- **(version)** v0.6.0 - (f7500ed) - github-actions[bot]

- - -

## v0.6.0 - 2026-02-01
#### Bug Fixes
- **(Card)** fix long card not appearing in time - (526736d) - Martin Kinoo
- **(FloatingContact)** hide properly when crossing contact form - (b370ae9) - Martin Kinoo
- **(NavBar)** prevent overlapping animation - (911d9a6) - Martin Kinoo
- **(NavBar)** Increase bound for visibility detection - (c9e6067) - Martin Kinoo
- **(Spotlight)** fix mouse follow on scroll - (3ff0245) - Martin Kinoo
- **(gyroTracker)** drift to ensure base keep stable - (8e8da4e) - Martin Kinoo
- **(gyroTracker)** calibrate the reading center point - (65534ae) - Martin Kinoo
- **(index)** _ on unused variable - (e05b567) - Martin Kinoo
- **(revealSection)** detect intersection before on mobile - (1f0ee10) - Martin Kinoo
- fix astro check warning - (3bdbd4b) - Martin Kinoo
#### Build system
- **(astro)** explicitely use bun - (55a0e98) - Martin Kinoo
#### Continuous Integration
- **(eslint)** allow empty function - (38897c9) - Martin Kinoo
- add articles to git ignore - (c259861) - Martin Kinoo
#### Features
- **(Spotlight)** mobile: add gyroscope support or default to top-left corner position) - (3973a79) - Martin Kinoo
- **(Spotlight)** brightrer effect - (153eebb) - Martin Kinoo
- **(navbar)** add colorfull underline effect - (d0a5ab2) - Martin Kinoo
- **(onHeroAnimationComplete)** add status completed/cancelled - (68c76f5) - Martin Kinoo
- **(revealCard)** add lighter animation for mobile - (3ad6445) - Martin Kinoo
#### Miscellaneous Chores
- **(version)** v0.5.0 - (bdd1899) - github-actions[bot]
#### Refactoring
- **(Card)** more atomic approach - (596582e) - Martin Kinoo
- **(Card)** merge realisation card into card - (9397d00) - Martin Kinoo
- **(NavBar)** simplify code - (02604e3) - Martin Kinoo
- **(Spotlight)** move mouse tracking to its own file - (90690bc) - Martin Kinoo
- **(animation)** add event-based animation timing for heroAnimationComplete (#21) - (fe5679d) - Martin Kinoo
- **(animations)** move all animations files to their own folder lib/animations - (0f7d958) - Martin Kinoo
- **(component)** implement new viewDetection - (8513495) - Martin Kinoo
- **(reveal)** add revealCrd/Section to lib from index - (e71978b) - Martin Kinoo
- **(spotlight)** move spotlight code to lib/dom - (c365fb7) - Martin Kinoo
- **(viewDetection)** split viewDetection in their own concern, in lib/dom - (1162398) - Martin Kinoo
- reóve unused components - (eff0d50) - Martin Kinoo

- - -

## v0.5.0 - 2026-02-01
#### Bug Fixes
- **(Card)** fix long card not appearing in time - (526736d) - Martin Kinoo
- **(FloatingContact)** hide properly when crossing contact form - (b370ae9) - Martin Kinoo
- **(NavBar)** prevent overlapping animation - (911d9a6) - Martin Kinoo
- **(NavBar)** Increase bound for visibility detection - (c9e6067) - Martin Kinoo
- **(Spotlight)** fix mouse follow on scroll - (3ff0245) - Martin Kinoo
- **(index)** _ on unused variable - (e05b567) - Martin Kinoo
- **(revealSection)** detect intersection before on mobile - (1f0ee10) - Martin Kinoo
- fix astro check warning - (3bdbd4b) - Martin Kinoo
#### Build system
- **(astro)** explicitely use bun - (55a0e98) - Martin Kinoo
#### Continuous Integration
- **(eslint)** allow empty function - (38897c9) - Martin Kinoo
- add articles to git ignore - (c259861) - Martin Kinoo
#### Features
- **(Spotlight)** mobile: add gyroscope support or default to top-left corner position) - (3973a79) - Martin Kinoo
- **(Spotlight)** brightrer effect - (153eebb) - Martin Kinoo
- **(ci)** add cocogitto for auto bump, changelog and deploy - (75dd961) - Martin Kinoo
- **(navbar)** add colorfull underline effect - (d0a5ab2) - Martin Kinoo
- **(onHeroAnimationComplete)** add status completed/cancelled - (68c76f5) - Martin Kinoo
- **(revealCard)** add lighter animation for mobile - (3ad6445) - Martin Kinoo
#### Miscellaneous Chores
- **(version)** v0.4.0 - (3a18b81) - github-actions[bot]
#### Refactoring
- **(Card)** more atomic approach - (596582e) - Martin Kinoo
- **(Card)** merge realisation card into card - (9397d00) - Martin Kinoo
- **(NavBar)** simplify code - (02604e3) - Martin Kinoo
- **(Spotlight)** move mouse tracking to its own file - (90690bc) - Martin Kinoo
- **(animation)** add event-based animation timing for heroAnimationComplete (#21) - (fe5679d) - Martin Kinoo
- **(animations)** move all animations files to their own folder lib/animations - (0f7d958) - Martin Kinoo
- **(component)** implement new viewDetection - (8513495) - Martin Kinoo
- **(reveal)** add revealCrd/Section to lib from index - (e71978b) - Martin Kinoo
- **(spotlight)** move spotlight code to lib/dom - (c365fb7) - Martin Kinoo
- **(viewDetection)** split viewDetection in their own concern, in lib/dom - (1162398) - Martin Kinoo
- reóve unused components - (eff0d50) - Martin Kinoo

- - -

## v0.4.0 - 2026-01-29
#### Features
- **(ci)** add cocogitto for auto bump, changelog and deploy - (75dd961) - Martin Kinoo

- - -

Changelog generated by [cocogitto](https://github.com/cocogitto/cocogitto).