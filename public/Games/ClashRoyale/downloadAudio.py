audioCode = """
sfx: {
            kittyopeningSound: {
                path: "media/audio/opening/kittyopening"
            },
            staticSound: {
                path: "media/audio/play/static"
            },
            openingSound: {
                path: "media/audio/opening/opening"
            },
            battleSound: {
                path: "media/audio/game/start-battle-long"
            },
            clickSound: {
                path: "media/audio/game/click"
            },
            starOneSound: {
                path: "media/audio/game/sone"
            },
            starTwoSound: {
                path: "media/audio/game/stwo"
            },
            starThreeSound: {
                path: "media/audio/game/sthree"
            },
            woshArrowSound: {
                path: "media/audio/game/arrow-shower-f"
            },
            woshFireSound: {
                path: "media/audio/game/wosh-fireball-a"
            },
            berserkSound: {
                path: "media/audio/game/berserk"
            },
            fireblastSound: {
                path: "media/audio/game/explode"
            },
            freezSound: {
                path: "media/audio/game/freez"
            },
            hammerEarthSound: {
                path: "media/audio/game/earthquake-fade"
            },
            hammercrushSound: {
                path: "media/audio/game/giant-sound"
            },
            thunderSound: {
                path: "media/audio/game/thunder"
            },
            maleOneSound: {
                path: "media/audio/game/m-aikh"
            },
            maleTwoSound: {
                path: "media/audio/game/m-argh"
            },
            maleThreeSound: {
                path: "media/audio/game/m-ok"
            },
            maleFourSound: {
                path: "media/audio/game/m-yach"
            },
            femaleSound: {
                path: "media/audio/game/mage"
            },
            hitMeleSound: {
                path: "media/audio/game/meleweapon"
            }
        },
        bgm: {
            background: {
                path: "media/audio/bgm",
                startOgg: 0,
                endOgg: 12.309,
                startMp3: 0,
                endMp3: 12.309
            }
        }
"""

import requests, regex, os

audioFormats = ['ogg'];

def createUrl(index):
    return f'https://gamessumo.com/html5/clash_of_clans/{index}';

def requestAudio(index):
    url = createUrl(index);

    response = requests.get(url);

    if response.status_code == 200:
        return response.content;
    # else:
        # raise Exception(f'Failed to download audio {index}');

def downloadAudio(index):
    if (os.path.exists(index)):
        print(f'Audio {index} already exists');
        
        return;

    # create the directories if they don't exist
    os.makedirs(os.path.dirname(index), exist_ok=True);

    with open(f'./{index}', 'wb') as f:
        f.write(requestAudio(index));

        print(f'Downloaded {index}');

def createAudioRegex(fileType):
    return regex.compile(f'".+/.+"');

def getCodeAudioURLS():
    urls = [];

    for fileType in audioFormats:
        r = createAudioRegex(fileType);
        matches = r.findall(audioCode);

        for match in matches:
            if (match == []):
                continue;

            urls.append(match.replace('"', ''));

    return urls;

def downloadAllAudio():
    urls = getCodeAudioURLS();

    for url in urls:
        downloadAudio(url + '.ogg');

downloadAllAudio();