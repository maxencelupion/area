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
Some screens about what you can find on our website version !

<img src="https://github.com/user-attachments/assets/1d3fb944-e76a-4a27-aa55-7fda952b174d">
<img src="https://github.com/user-attachments/assets/ae0b3959-17af-4eb9-a58f-20ac6c804c98">
<img src="https://github.com/user-attachments/assets/b76a3b09-d90b-4af3-b580-c13865bb0e3a">

*Homepage*

<img src="https://github.com/user-attachments/assets/9adc81d4-d429-4f18-8198-c184fd96953d">
<img src="https://github.com/user-attachments/assets/09fa3712-6896-497e-bdaa-10731fd904cd">

*Services and examples Areas on Services page*

<img src="https://github.com/user-attachments/assets/b1d2c1d7-7920-4ffd-adc5-2ca857b87cfd">

*Login / Signup using Oauth2 or basic email/password auth*

<img src="https://github.com/user-attachments/assets/b2ecff5a-8662-4b43-9538-dec48b00fb03">

*Area creation on My Areas page*

<img src="https://github.com/user-attachments/assets/f14934c8-4e21-4608-ad85-a3c9806a7374">

*Profile page*

<img src="https://github.com/user-attachments/assets/48e4db84-1622-435e-82d2-5db95c73c43b">

*Help page through Profile page*


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
