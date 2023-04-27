import requests
imageTables = """
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/bar-sheet0.png">bar-sheet0.png</a>         </td><td align="right">2020-11-06 17:05  </td><td align="right">155 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/button_erase_data-sheet0.png">button_erase_data-sh..&gt;</a></td><td align="right">2020-11-06 17:05  </td><td align="right">1.0K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/button_replay-sheet0.png">button_replay-sheet0..&gt;</a></td><td align="right">2020-11-06 17:05  </td><td align="right">7.8K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/chassis-sheet0.png">chassis-sheet0.png</a>     </td><td align="right">2020-11-06 17:05  </td><td align="right">387 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/ground-sheet0.png">ground-sheet0.png</a>      </td><td align="right">2020-11-06 17:05  </td><td align="right">1.1K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/head-sheet0.png">head-sheet0.png</a>        </td><td align="right">2020-11-06 17:05  </td><td align="right">1.8K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/icon_best-sheet0.png">icon_best-sheet0.png</a>   </td><td align="right">2020-11-06 17:05  </td><td align="right">1.5K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/icon_deads-sheet0.png">icon_deads-sheet0.png</a>  </td><td align="right">2020-11-06 17:05  </td><td align="right">1.7K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/label_best-sheet0.png">label_best-sheet0.png</a>  </td><td align="right">2020-11-06 17:05  </td><td align="right">2.9K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/line_best.png">line_best.png</a>          </td><td align="right">2020-11-06 17:05  </td><td align="right">112 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/line_end.png">line_end.png</a>           </td><td align="right">2020-11-06 17:05  </td><td align="right">111 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/line_start.png">line_start.png</a>         </td><td align="right">2020-11-06 17:05  </td><td align="right">184 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/map_setting-sheet0.png">map_setting-sheet0.png</a> </td><td align="right">2020-11-06 17:05  </td><td align="right">945 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/obstacle-sheet0.png">obstacle-sheet0.png</a>    </td><td align="right">2020-11-06 17:05  </td><td align="right">127K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/obstacle-sheet1.png">obstacle-sheet1.png</a>    </td><td align="right">2020-11-06 17:05  </td><td align="right">5.0K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/obstacle_group-sheet0.png">obstacle_group-sheet..&gt;</a></td><td align="right">2020-11-06 17:05  </td><td align="right">356 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/pattern-sheet0.png">pattern-sheet0.png</a>     </td><td align="right">2020-11-06 17:05  </td><td align="right">205K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/pedal-sheet0.png">pedal-sheet0.png</a>       </td><td align="right">2020-11-06 17:05  </td><td align="right">155 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/rider_arm_a-sheet0.png">rider_arm_a-sheet0.png</a> </td><td align="right">2020-11-06 17:05  </td><td align="right">396 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/rider_arm_b-sheet0.png">rider_arm_b-sheet0.png</a> </td><td align="right">2020-11-06 17:05  </td><td align="right">353 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/rider_leg_a-sheet0.png">rider_leg_a-sheet0.png</a> </td><td align="right">2020-11-06 17:05  </td><td align="right">755 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/rider_leg_b-sheet0.png">rider_leg_b-sheet0.png</a> </td><td align="right">2020-11-06 17:05  </td><td align="right">1.6K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/riderbody-sheet0.png">riderbody-sheet0.png</a>   </td><td align="right">2020-11-06 17:05  </td><td align="right">631 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/rueda1-sheet0.png">rueda1-sheet0.png</a>      </td><td align="right">2020-11-06 17:05  </td><td align="right">2.7K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/sprite-sheet0.png">sprite-sheet0.png</a>      </td><td align="right">2020-11-06 17:05  </td><td align="right"> 17K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/sprite2-sheet0.png">sprite2-sheet0.png</a>     </td><td align="right">2020-11-06 17:05  </td><td align="right">5.2K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/sprite3-sheet0.png">sprite3-sheet0.png</a>     </td><td align="right">2020-11-06 17:05  </td><td align="right"> 34K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/sprite5-sheet0.png">sprite5-sheet0.png</a>     </td><td align="right">2020-11-06 17:05  </td><td align="right">607 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/sprite6-sheet0.png">sprite6-sheet0.png</a>     </td><td align="right">2020-11-06 17:05  </td><td align="right"> 33K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/spritefont.png">spritefont.png</a>         </td><td align="right">2020-11-06 17:05  </td><td align="right">1.4K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/square-sheet0.png">square-sheet0.png</a>      </td><td align="right">2020-11-06 17:05  </td><td align="right">5.6K</td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/start_order_obstacle-sheet0.png">start_order_obstacle..&gt;</a></td><td align="right">2020-11-06 17:05  </td><td align="right">711 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/tiledbackground.png">tiledbackground.png</a>    </td><td align="right">2020-11-06 17:05  </td><td align="right">249 </td><td>&nbsp;</td></tr>
https://cdn.primarygames.com/HTML5/UltimateWheelie/images/touch_run-sheet0.png">touch_run-sheet0.png</a>   </td><td align="right">2020-11-06 17:05  </td><td align="right">168 </td><td>&nbsp;</td></tr>""";

split = imageTables.split("\n");

for row in split:
    row = row.split("\"");

    if len(row) > 1:
        url = row[0];
        name = url.replace('https://cdn.primarygames.com/HTML5/UltimateWheelie/images/', '');

        request = requests.get(url);
        with open('./images/' + name, 'wb') as f:
            f.write(request.content);

        print(name);