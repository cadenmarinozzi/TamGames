import requests

def createUrl(index):
    return f'https://87a9e3ea-a44d-4e23-8636-92b93e95d95b.id.repl.co/StreamingAssets/LevelData/map{index}.xml';

def requestLevel(index):
    url = createUrl(index);

    response = requests.get(url);

    if response.status_code == 200:
        return response.text;
    else:
        raise Exception(f'Failed to download level {index}');

def downloadLevel(index):
    with open(f'./StreamingAssets/LevelData/map{index}.xml', 'w') as f:
        f.write(requestLevel(index));

def downloadAllLevels():
    for i in range(0, 8):
        downloadLevel(i);

downloadAllLevels();