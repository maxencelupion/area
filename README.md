# Project Name

## Overview

AREA project is a full-stack application with both mobile and web apps built with Expo, Next.js and NestJS.
AREA is an IFTTT or Zapier app like.
It allows users to links between services like Google or Microsoft.
Those services provide 'Actions' and 'Reactions' which are actions enabled by API calls.
The set composed of an Action and Reactions is called an 'Area'.
Areas are manually activated.
The user needs to authenticate to chosen services within an Area to enable it.
An Area will trigger the Reactions if an Action has been received.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Docker](https://www.docker.com/) version `>= 27.3`
- [Docker Compose](https://docs.docker.com/compose/) version `>= 2.29.7`
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional if building mobile apps)
- [Android Studio SDK](https://developer.android.com/studio) (for Android builds)
- [EAS CLI](https://docs.expo.dev/eas/) (for building mobile apps with Expo)

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AREA-EPITECH/AREA-mirror.git
cd AREA-mirror
```

### 2. Certificates
You need to copy certificates under **certificates** folder.
The required certificates are : **fullchain.crt** & **private.key**

### 3. DNS Resolver
You will need to add Google DNS server instead of the default one on your network.

```bash
cat /etc/resolv.conf
sudo nano /etc/resolv.conf
```
Add the following line and comment the other ones:
```text
nameserver 8.8.8.8
```

### 4. Ports
You will need to open the port 443 on your machine to make the backend container accessible through HTTPS.
When you request an URL on my subdomain 'area.tvermorel.fr', Nginx reverse proxy running as a container on port 443 will then forward the request to the backend container running on port 8080.
Execute the following commands:
```code
sudo ufw enable
sudo ufw allow 443
```

### 3. Build project
```bash
docker compose build
docker compose up
```
## Results
Here are some screenshots showcasing key features and pages of our website version.

| Page | Results |
|------|-----------|
| **Homepage** | ![Homepage](https://github.com/user-attachments/assets/2729ae22-1949-4018-a30a-be92e1a9698e) |
| **Services Page** (Example Areas) | ![Services](https://github.com/user-attachments/assets/a99e5f4e-4ced-4e47-94f8-8fa2f6fa8943) |
| **Login / Signup** (OAuth2 & Email/Password) | ![Auth](https://github.com/user-attachments/assets/62810c21-0126-43c6-8895-724ca17d1451) |
| **My Areas** (Create an Area) | ![My Areas](https://github.com/user-attachments/assets/c8ada914-bc67-48e9-9a7a-7db436f6ef45) |
| **Profile Page** | ![Profile](https://github.com/user-attachments/assets/184d8fb6-20d5-4126-b468-87e3e7681ea8) |
| **Help Page** (via Profile) | ![Help](https://github.com/user-attachments/assets/245b63f9-d58c-40bc-9137-3a4f52c630e8) |


## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
            <td align="center" valign="top" width="14.28%"><a href="https://github.com/maxencelupion"><img src="https://avatars.githubusercontent.com/u/114016583?v=4?s=100" width="100px;" alt="Maxence Lupion"/><br /><sub><b>Maxence Lupion</b></sub></a><br /><a href="#code-maxencelupion" title="Code">💻</a> <a href="#a11y-maxencelupion" title="Accessibility">️️️️♿️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nathanbaudelin"><img src="https://avatars.githubusercontent.com/u/114907307?v=4?s=100" width="100px;" alt="Nathan Baudelin"/><br /><sub><b>Nathan Baudelin</b></sub></a><br /><a href="#code-nathanbaudelin" title="Code">💻</a> <a href="#example-nathanbaudelin" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zoldik333"><img src="https://avatars.githubusercontent.com/u/114875350?v=4?s=100" width="100px;" alt="Théo Vermorel"/><br /><sub><b>Théo Vermorel</b></sub></a><br /><a href="#projectManagement-zoldik333" title="Project Management">📆</a> <a href="#code-zoldik333" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Lowan974"><img src="https://avatars.githubusercontent.com/u/96384786?v=4?s=100" width="100px;" alt="Lowan974"/><br /><sub><b>Lowan974</b></sub></a><br /><a href="#code-Lowan974" title="Code">💻</a> <a href="#design-Lowan974" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/giordano-pierre"><img src="https://avatars.githubusercontent.com/u/114906570?v=4?s=100" width="100px;" alt="giordano-pierre"/><br /><sub><b>giordano-pierre</b></sub></a><br /><a href="#code-giordano-pierre" title="Code">💻</a> <a href="#design-giordano-pierre" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
