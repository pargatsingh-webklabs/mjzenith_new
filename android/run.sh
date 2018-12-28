#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n mjzenith.com.mjzenith/host.exp.exponent.MainActivity
