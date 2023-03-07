sites = '''
https://tamgames.net/
https://tamgames.net/#/privacyPolicy
https://tamgames.net/#/termsOfUse
https://tamgames.net/robots.txt
https://tamgames.net/sitemap.txt
https://tamgames.net/#/happyWheels
https://tamgames.net/#/snakeIO
https://tamgames.net/#/jetpackJoyriders
https://tamgames.net/#/minecraft
https://tamgames.net/#/driftBoss
https://tamgames.net/#/angryBirds
https://tamgames.net/#/learnToFly
https://tamgames.net/#/ultimateWheelie
https://tamgames.net/#/paperIO
https://tamgames.net/#/justFall
https://tamgames.net/#/amongUs
https://tamgames.net/#/retroBowl
https://tamgames.net/#/1v1LOL
https://tamgames.net/#/mario
https://tamgames.net/#/clusterRush
https://tamgames.net/#/greyBox
https://tamgames.net/#/superhot
https://tamgames.net/#/motoX3M
https://tamgames.net/#/scrapMetal
https://tamgames.net/#/slope
https://tamgames.net/#/stack
https://tamgames.net/#/clashRoyale
https://tamgames.net/#/driftHunters
https://tamgames.net/#/subwaySurfers
https://tamgames.net/#/crossyRoad
https://tamgames.net/#/worldsHardestGame
https://tamgames.net/#/helixJump
https://tamgames.net/#/rollingForests
''';

sites = sites.split('\n');
sites = [site for site in sites if site != ''];

siteMap = '''
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
''';

for i, site in enumerate(sites):
    siteMap += f'\t<url>\n\t\t<loc>{site}</loc>\n\t</url>\n';

siteMap += '</urlset>';

with open('./public/sitemap.xml', 'w') as f:
    f.write(siteMap);