import requests, os

images = """
media/scenes/trail.png
media/scenes/trail.png
media/scenes/car_standard.png
media/scenes/bg.png
media/scenes/pattern_0.png
media/scenes/pattern_1.png
media/scenes/pattern_2.png
media/scenes/pattern_3.png
media/scenes/pattern_4.png
media/scenes/car_police.png
media/scenes/car_pickup.png
media/scenes/car_box.png
media/scenes/car_ice_cream_truck.png
media/scenes/car_taxi.png
media/scenes/car_firefighter.png
media/scenes/car_ambulance.png
media/scenes/coin.png
media/scenes/confetti.png
media/scenes/start_line.png
media/scenes/smoke.png
media/graphics/misc/invisible.png
"""

images = images.split('\n');
images = [image for image in images if image != ''];

for image in images:
    url = f'https://www.mathplayground.com/drift-boss-v3/{image}';
    response = requests.get(url);

    if response.status_code == 200:
        os.makedirs(os.path.dirname(f'./drift-boss-v3/{image}'), exist_ok=True);

        with open(f'./drift-boss-v3/{image}', 'wb') as f:
            f.write(response.content);
            print(f'Downloaded {image}');
    else:
        print(f'Failed to download {image}');