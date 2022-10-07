# Script that loops the tests

import json
import os
import time


while True:

    try:

        f = open('settings.json',)
        settings = json.load(f)
        f.close()

        if settings["TestLoopSettings"]["Pause"] == False:
            os.system("cd .. && npm run test")
            time.sleep(settings["TestLoopSettings"]["DelaySeconds"])
        else:
            time.sleep(3)

    except:
        time.sleep(1)
