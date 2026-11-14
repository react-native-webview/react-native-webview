#!/bin/sh
# Keeps "<app> isn't responding" dialogs away from an end-to-end test on an Android emulator.
#
#   sh dismiss-anr-dialogs.sh <id of the app under test>
#
# On a slow runner, a freshly booted emulator sometimes shows "Pixel Launcher isn't
# responding" over the app under test. The dialog stays until it is answered, so the test
# cannot see the app. Until this script is killed, it stops every other app that has such a
# dialog, which removes the dialog. The app under test is left alone: if it stops responding,
# the test has to fail.
APP_ID="$1"

while true; do
  # The dialog is a window named "Application Not Responding: <process>".
  for process in $(adb shell dumpsys window windows 2>/dev/null |
    sed -n 's/.*Application Not Responding: \([A-Za-z0-9._:]*\).*/\1/p' | sort -u); do
    package="${process%%:*}"
    if [ "$package" != "$APP_ID" ]; then
      echo "$(date +%T) $process is not responding: stopping $package"
      adb shell am force-stop "$package"
    fi
  done
  sleep 3
done
