import requests, os

images = """
cdn-cgi/mirage_speedtest/1678477919218
"""

images = images.split('\n');
images = [image for image in images if image != ''];

for image in images:
    url = f'https://html5.gamemonetize.co/0po1nwk3ebjwjsatsj4bpjzceeh72n83/?gd_sdk_referrer_url=https%253A%252F%252Fdoodoo.love%252Fcut-the-rope-game/{image}';
    response = requests.get(url);

    if response.status_code == 200:
        os.makedirs(os.path.dirname(f'./{image}'), exist_ok=True);

        with open(f'./{image}', 'wb') as f:
            f.write(response.content);
            print(f'Downloaded {image}');
    else:
        print(f'Failed to download {image}');