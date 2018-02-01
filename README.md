## How to start development

This project uses Node Package Manager (NPM) and node to compile typescript, 
templates, and styling files to javascript, HTML, and CSS.
To use these, download and install [node](https://nodejs.org/en/download/).
### Prerequisits
[JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or higher.

If you want to test natively on android, 
[Android Studio](https://developer.android.com/studio/install.html) is also needed.
After that's installed, make sure the gradle bin folder is in your system PATH and the 
GRADLE_HOME environment variable is set to the gradle directory.

Then an android Platform will need to be installed in the SDK Manager of Android Studio.

### Install
Clone this repository and cd into the root directory of the mixabot app.

Install all of the package dependencies and make sure Ionic
is installed globally:

```bash
$ npm install
$ npm install -g ionic
$ npm install -g cordova
```

### Setup typescript (optional)
If you want to run typescript files directly from the command line
[ts-node](https://github.com/TypeStrong/ts-node) becomes very useful:
```bash
$ npm install -g ts-node
$ npm install -g typescript
```

Then you can run any typescript script, for example:

```bash
$ ts-node server/script.ts
```

### Run the app
Restart the terminal OR make sure ionic is in your path environment
variable.

Now start the app to automatically launch it in a browser:

```bash
$ ionic serve
```

### Deploy
Jarsign the APK:

"/c/Program Files"/Java/jdk1.8.0_151/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keys/my-release-key.jks platforms/android/build/outputs/apk/android-release-unsigned.apk my-alias
/c/Users/quinw/AppData/Local/Android/Sdk/build-tools/27.0.3/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk SirMixABot.apk
/c/Users/quinw/AppData/Local/Android/Sdk/build-tools/27.0.3/apksigner verify SirMixABot.apk
