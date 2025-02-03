FROM node:22-bullseye AS base
WORKDIR /app
COPY . .
ARG EXPO_USER
ARG EXPO_PASS
ENV EAS_NO_VCS=1
ENV CI=1
ENV EAS_BUID=true
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV ANDROID_HOME=/usr/lib/android-sdk
ENV PATH=$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH

RUN apt-get update && \
    apt-get install -y jq openjdk-17-jdk wget unzip
RUN mkdir -p /usr/lib/android-sdk/ && \
    cd /usr/lib/android-sdk/ && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip && \
    unzip commandlinetools-linux-7583922_latest.zip && \
    rm commandlinetools-linux-7583922_latest.zip
RUN yes | /usr/lib/android-sdk/cmdline-tools/bin/sdkmanager --sdk_root=$ANDROID_HOME --licenses && \
    /usr/lib/android-sdk/cmdline-tools/bin/sdkmanager --sdk_root=$ANDROID_HOME "platform-tools" "platforms;android-30" "build-tools;30.0.3" "ndk;26.1.10909125"
RUN npm install expo@latest && \
    npm install -g eas-cli && \
    npx expo install --fix
RUN npx expo login -u $EXPO_USER -p $EXPO_PASS && \
    eas whoami
RUN npm config delete proxy && \
    npm config delete http-proxy && \
    npm config delete https-proxy
RUN eas build -p android --profile preview --local --non-interactive --output=./client.apk
CMD ["tail", "-f", "/dev/null"]