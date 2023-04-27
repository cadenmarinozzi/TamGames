import requests, regex, os

codeURL = './game.js';
baseURL = 'https://gamessumo.com/html5/clash_of_clans/';

fileTypes = ['png', 'jpg', 'jpeg', 'gif', 'ogg'];

with open(codeURL, 'r') as f:
    code = f.read();

def createUrl(index):
    return f'{baseURL}{index}';

def requestImage(index):
    url = createUrl(index);

    response = requests.get(url);

    if response.status_code == 200:
        return response.content;
    # else:
        # raise Exception(f'Failed to download image {index}');

def downloadImage(index):
    if (os.path.exists(index)):
        print(f'Image {index} already exists');
        
        return;

    # create the directories if they don't exist
    os.makedirs(os.path.dirname(index), exist_ok=True);

    with open(f'./{index}', 'wb') as f:
        f.write(requestImage(index));

        print(f'Downloaded {index}');

def createImageRegex(fileType):
    # ".+/.+.png" <- This is the regex for a png file. It should include the quotes
    return regex.compile(f'".+/.+.{fileType}"');
 
def getCodeImageURLS(code):
    urls = [];

    for fileType in fileTypes:
        r = createImageRegex(fileType);
        matches = r.findall(code);

        for match in matches:
            if (match == []):
                continue;

            urls.append(match.replace('"', ''));

    return urls;
        

def downloadAllImages():
    urls = getCodeImageURLS(code);

    for url in urls:
        downloadImage(url);

downloadAllImages();