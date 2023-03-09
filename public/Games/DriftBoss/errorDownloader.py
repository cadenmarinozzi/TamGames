import requests, os, regex

images = """
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/scenes/game-scene.babylon 404 (Not Found)
_0x5bd376.send @ game.js:1
_0x233a96 @ game.js:1
_0x3aec71 @ game.js:1
_0x412670.LoadFile @ game.js:1
_0x2426b3 @ game.js:1
_0x22ac37 @ game.js:1
_0x3647a9.b.OfflineProviderFactory @ game.js:1
_0x285b76._loadData @ game.js:1
_0x285b76.Append @ game.js:1
_0x285b76.Load @ game.js:1
loadScene @ game.js:1
reloadLevel @ game.js:1
wgl.webglmain @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/opening/kittyopening.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/play/static.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/opening/opening.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/coin.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/skid1.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/skid2.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/skid3.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/crash.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/engine.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/engine-low.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/engine-in.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/engine-out.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/reward.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/click.ogg 404 (Not Found)
load @ game.js:1
init @ game.js:1
Howl.init @ game.js:1
_0x188bd1 @ game.js:1
init @ game.js:1
(anonymous) @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
game.js:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/audio/bgm.mp3 404 (Not Found)
initWebAudio @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
init @ game.js:1
_0x32005e @ game.js:1
(anonymous) @ game.js:1
onLoadJsonComplete @ game.js:1
loadAllJson @ game.js:1
initPacker @ game.js:1
(anonymous) @ game.js:1
_execModules @ game.js:1
_DOMReady @ game.js:1
c @ VM6648 rocket-loader.min.js:1
l @ VM6648 rocket-loader.min.js:1
t.simulateStateAfterDeferScriptsActivation @ VM6648 rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
P @ rocket-loader.min.js:1
callback @ rocket-loader.min.js:1
t.run @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ VM6648 rocket-loader.min.js:1
load (async)
t.runOnLoad @ VM6648 rocket-loader.min.js:1
x @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
(anonymous) @ rocket-loader.min.js:1
texture.png:1          GET http://localhost:5500/public/Games/DriftBoss/drift-boss-v3/media/graphics/packed/texture.png 
"""

# Get the images from the error messages and download them

reg = 