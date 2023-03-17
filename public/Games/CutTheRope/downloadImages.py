import requests, regex, os

codeURL = './drift-boss-v3/game.js';
baseURL = 'https://www.mathplayground.com/drift-boss-v3/';
fileTypes = ['png', 'jpg', 'jpeg', 'gif', 'ogg', 'mp3', 'mp4'];

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
        img = requestImage(index);

        if (img == None):
            return;

        f.write(img);

        print(f'Downloaded {index}');

def createImageRegex(fileType):
    # x22media/graphics/sprites/.+?(\.png) <- This is the regex for a png file
    return regex.compile(f'x22media\/graphics\/sprites\/.+?\.{fileType}');

def getCodeImageURLS(code):
    urls = [];

    for fileType in fileTypes:
        r = createImageRegex(fileType);
        matches = r.findall(code);
        print(matches)
        for match in matches:
            if (match == []):
                continue;

    return urls;
        

def downloadAllImages():
    urls = getCodeImageURLS(code);

    for url in urls:
        downloadImage(url);

downloadAllImages();