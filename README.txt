------------------------------- LEPRECHAUD -------------------------------

cd android
gradlew clean
gradle cleanBuildCache
gradlew build --refresh-dependencies
cd ..
npx react-native start --reset-cache
npx react-native run-android

npm install -g npm@latest   //salva vidas XD
npm cache clean --force

------------------------------- CLEAR -------------------------------
npx react-native-clean-project


------------------------------- TABS -------------------------------
npm uninstall react-native-reanimated  
npm install react-navigation-tabs --save


------------------------------- DEPENDENCIAS -------------------------------
react
react-native-gesture-handler
@react-navigation/drawer
react-native-reanimated

npm install -g npm-check-updates

ncu
ncu -u  "actualiza todos los necesarios"
ncu -a "actualiza todos por igual"
------------------------------- START -------------------------------
npx react-native init AwesomeTSProject --template react-native-template-typescript
npx react-native run-android
npx react-native start
